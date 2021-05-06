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

class AEDTable2 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Album",
        dataIndex: "album",
        width: "30%",
        editable: true,
      },
      {
        title: "Tracks",
        dataIndex: "tracks",
        editable: true,
      },
      {
        title: "Action",
        dataIndex: "Action",
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
        //   album: "Master",
        //   tracks: "Vathi Raid",
        // },
        // {
        //   key: "1",
        //   album: "Karnan",
        //   tracks: "Kandaa Vara Sollunga",
        // },
      ],
      count: 2,
      album: "",
      tracks: "",
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      album: this.state.album,
      tracks: this.state.tracks,
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
      <div style={{ marginTop: "20px" }}>
        <Title level={4} strong>
          Albums
        </Title>
        <Row>
          <Col span={8}>
            <Input
              placeholder="Name of Album"
              onChange={(event) => {
                this.setState({
                  album: event.target.value,
                });
              }}
            />
          </Col>
          <Col span={8}>
            <Input
              placeholder="Name of tracks"
              onChange={(event) => {
                this.setState({
                  tracks: event.target.value,
                });
              }}
            />
          </Col>

          <Col span={8}>
            <Button
              disabled={
                (this.state.tracks && this.state.album) === "" ? true : false
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
export default AEDTable2;
