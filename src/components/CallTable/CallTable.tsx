import { Table, Input, Button } from 'antd';
import { DeleteOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { callApi } from '@/utils/axiosHelper';
import { ENDPOINTS } from '@/utils/endpoints';

const columns = [
    {
        title: 'Account',
        dataIndex: 'account_name',
        key: 'account_name',
    },
    {
        title: 'Answered Calls',
        dataIndex: 'answered_calls',
        key: 'answered_calls',
    },
    {
        title: 'Not Answered Calls',
        dataIndex: 'not_answered_calls',
        key: 'not_answered_calls',
    },
    {
        title: 'Total Rejected Calls',
        dataIndex: 'rejected_calls',
        key: 'rejected_calls',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: () => (
            <div className="flex gap-1">
                <Button icon={<DeleteOutlined />} type="text" />
                <Button icon={<ShareAltOutlined />} type="text" />
            </div>
        ),
    },
];

interface ICallTableProps {
    handleAddAccountClick: () => void;

}

const mockData = [
    { _id: 'abcd1234', provider: 'twilio', account_name: 'Marketing', answered_calls: 30, not_answered_calls: 15, rejected_calls: 8 },
    { _id: 'abcd1235', provider: 'twilio', account_name: 'Tech Support', answered_calls: 30, not_answered_calls: 15, rejected_calls: 8 },
]
export default function CallTable(props: ICallTableProps) {
    const { handleAddAccountClick } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [data, setData] = useState<{
      _id: string;
      provider: string;
      account_name: string;
      answered_calls: number;
      not_answered_calls: number;
      rejected_calls: number;
    }[]>([]);

    useEffect(() => {
        fetchAccounts();
    }, []);

    async function fetchAccounts() {
      try {
        setIsLoading(true);
        const response = await callApi({
          url: ENDPOINTS.getTwilioAccounts,
          method: 'GET',
        });
        if(response && response.status === 200 && response.data && response.data.length > 0) {
          setData(mockData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    const filteredData = mockData?.filter((item: { account_name: string }) =>
        item?.account_name?.toLowerCase()?.includes(search.toLowerCase())
    );

    return (
        <div className="bg-white p-8 rounded shadow mt-6">
            <Input.Search
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="mb-4 w-[100px]"
            />
            <Table
                columns={columns}
                loading={isLoading}
                dataSource={filteredData}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
            />
            <Button
                onClick={() => handleAddAccountClick()}
                className="mt-4 text-white min-w-[6rem]">
                Add
            </Button>
        </div>
    );
}