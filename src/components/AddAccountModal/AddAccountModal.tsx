import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { callApi } from '@/utils/axiosHelper';
import { ENDPOINTS } from '@/utils/endpoints';
import { notification } from 'antd';
import axios from 'axios';
interface AddAccountModalProps {
	open: boolean;
	onOk: () => void;
	onCancel: () => void;
	title?: React.ReactNode;
	width?: number | string;
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({
	open,
	onOk,
	onCancel,
	title,
	width = 520,
}) => {

	const [accountName, setAccountName] = useState('');
	const [accountSid, setAccountSid] = useState('');
	const [authToken, setAuthToken] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const [api, contextHolder] = notification.useNotification();

	const openNotification = (key: string,message: string, description: string) => {
		api.open({
			key,
			message,
			description,
		});
	}

	const getAddAccountModalContent = () => {
		return (
			<div>
				<div className='text-xl  font-bold mb-2'>Connect your Twilio Account</div>
				<div className='text-sm text-gray-500'>Connect your Twilio Account to enable <br /> calling capabilities viA VoIP</div>
				<div className='flex flex-col gap-6 py-8'>
					<Input placeholder='Account Name' className='mb-4 px-4 h-[3rem]'
						value={accountName}
						onChange={(e) => setAccountName(e.target.value)}
					/>
					<Input placeholder='Twilio Account SID' className='mb-4 px-4 h-[3rem]'
						value={accountSid}
						onChange={(e) => setAccountSid(e.target.value)}
					/>
					<Input placeholder='Twilio Auth Token' className='mb-4 px-4 h-[3rem]'
						value={authToken}
						onChange={(e) => setAuthToken(e.target.value)}
					/>
				</div>
			</div>
		)
	}

	const handleConnectTwilioAccount = async () => {
		const body = {
			// TODO:We can keep this in config file
			provider: "twilio",
			twilio: {
				account_sid: accountSid,
				auth_token: authToken,
			},
			account_name: accountName,
		}
		try {
			setIsLoading(true);
			const response = await callApi({
				url: ENDPOINTS.createTwilioAccount,
				method: 'POST',
				data: body,
			});
			if (response && response.status === 200) {
				onOk();
				openNotification('twilio-account-connected', 
					'Twilio Account Connected Successfully', 
					'Your Twilio Account has been connected successfully.');
			} else {
				openNotification('error-connecting-twilio-account', 
					'Error Connecting Twilio Account', 
					response?.data?.message || 'Unknown error occurred.');
			}
		} catch (error: unknown) {
			let errorMsg = 'Error Connecting Twilio Account';
			if (axios.isAxiosError(error)) {
				errorMsg = error.response?.data?.message || error.message || errorMsg;
			} else if (error instanceof Error) {
				errorMsg = error.message;
			}
			openNotification('error-connecting-twilio-account', 
				'Error Connecting Twilio Account', errorMsg);
		} finally {
			setIsLoading(false);
		}
	}

	const getAddAccountModalFooter = () => {
		return (
			<div className='flex justify-end gap-4'>
				<Button className='bg-gray-200 text-black' onClick={onCancel}>Cancel</Button>
				<Button className='bg-indigo-400 text-white'
					loading={isLoading}
					disabled={!accountName || !accountSid || !authToken}
					onClick={handleConnectTwilioAccount}>Connect</Button>
			</div>
		)
	}
	return (
		<Modal
			className='add-account-modal'
			open={open}
			onOk={onOk}
			onCancel={onCancel}
			title={title || ''}
			footer={getAddAccountModalFooter()}
			width={width}
			style={{
				height: '20rem'
			}}
		>
			{contextHolder}
			{getAddAccountModalContent()}
		</Modal>
	)
};

export default AddAccountModal;