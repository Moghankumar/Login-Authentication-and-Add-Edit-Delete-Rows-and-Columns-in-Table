import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Table,
  Input,
  Button,
  Popconfirm,
  Form,
  Typography,
  Row,
  Col,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class AedTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Name of Track",
        dataIndex: "track",
        editable: true,
      },
      {
        title: "Name of Artist",
        dataIndex: "artist",
        editable: true,
      },
      {
        title: "Length of tracks",
        dataIndex: "length",
        editable: true,
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <Button type="primary">
                <DeleteOutlined />
                Delete
              </Button>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        // {
        //   key: "0",
        //   track: "Master",
        //   artist: "Thalapathy Vijay",
        //   length: "3.0",
        // },
        // {
        //   key: "1",
        //   track: "Mandela",
        //   artist: "Yogi Babu",
        //   length: "2.58",
        // },
      ],
      count: 2,
      albumname: "",
      artistname: "",
      lengthtrack: "",
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = (event) => {
    event.preventDefault();
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      track: this.state.albumname,
      artist: this.state.artistname,
      length: this.state.lengthtrack,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Title level={4} strong>
          Tracks
        </Title>
        <Row>
          <Col span={6}>
            <Input
              placeholder="Name of track"
              onChange={(event) => {
                this.setState({
                  albumname: event.target.value,
                });
              }}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="Name of Artist"
              onChange={(event) => {
                this.setState({
                  artistname: event.target.value,
                });
              }}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="Length of tracks"
              onChange={(event) => {
                this.setState({
                  lengthtrack: event.target.value,
                });
              }}
            />
          </Col>
          <Col span={6}>
            <Button
              disabled={
                (this.state.albumname &&
                  this.state.artistname &&
                  this.state.lengthtrack) === ""
                  ? true
                  : false
              }
              onClick={this.handleAdd}
              type="primary"
              style={{
                marginBottom: 16,
              }}
            >
              Add to table
            </Button>
          </Col>
        </Row>

        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}
export default AedTable;
