import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'SDGs',
    dataIndex: 'sdgs',
    key: 'sdgs',
  },
  {
    title: 'Problem Statements/Challenges',
    dataIndex: 'problemStatements',
    key: 'problemStatements',
  },
  {
    title: 'Targets to be achieved',
    dataIndex: 'targetsToBeAchieved',
    key: 'targetsToBeAchieved',
  },
  {
    title: '#',
    dataIndex: 'image',
    key: 'image',
  },
];

const SITKTable = (data) => {
  const tableDetail = data?.data?.map((item, index) => {
    return {
      sdgs: item.sdgs,
      problemStatements: (
        <div dangerouslySetInnerHTML={{ __html: item.problemStatement }} />
      ),
      targetsToBeAchieved: (
        <div dangerouslySetInnerHTML={{ __html: item.targetToBeAchieved }} />
      ),
      image: (
        <img
          src={item.image.sourceUrl}
          style={{ width: '180px', height: '180px' }}
        />
      ),
    };
  });
  return (
    <Table columns={columns} dataSource={tableDetail} pagination={false} />
  );
};
export default SITKTable;
