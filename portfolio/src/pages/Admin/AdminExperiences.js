import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, message, Modal } from "antd";
import { hideLoading, ReloadData, showLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminExperiences() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { experiences } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response;
      if (selectedItemForEdit !== null) {
        response = await axios.post("/api/portfolio/update-experience", {
          ...values,
          id: selectedItemForEdit.id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-experience", values);
      }

      dispatch(hideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(showLoading());
      let response = await axios.post("/api/portfolio/delete-experience", {
        _id: item._id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="mb-5">
      <div
        className="flex justify-end"
        onClick={() => {
          setShowAddEditModal(true);
          setSelectedItemForEdit(null);
        }}
      >
        <button className="bg-primary text-white font-bold py-2 px-5 rounded m-3">
          Add Experience
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 sm:grid-cols-1">
        {experiences.map((experience) => (
          <div
            className="shadow border-2 border-gray-400 p-5 text-justify rounded"
            key={experience.id} // Add a unique key if possible
          >
            <h1 className="text-secondary text-xl font-bold">
              {experience.period}
            </h1>
            <h2 className="">
              <span className="font-bold text-[18px] text-tertiary">
                Company:
              </span>{" "}
              {experience.company}
            </h2>
            <h2 className="">
              <span className="font-bold text-[18px] text-tertiary">
                Position:
              </span>{" "}
              {experience.title}
            </h2>
            <p className="">{experience.description}</p>

            <div className="flex space-x-2 mt-4 justify-end gap-5">
              <button
                className="bg-[red] text-white px-5 py-2 rounded-md"
                onClick={() => {
                  onDelete(experience);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2 rounded-md"
                onClick={() => {
                  setSelectedItemForEdit(experience);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* modal */}
      {(type === "add" || selectedItemForEdit) && (
        <Modal
          visible={showAddEditModal}
          title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedItemForEdit}
          >
            <Form.Item
              name="period"
              label="Period: "
              rules={[{ required: true, message: "Please enter the period" }]}
            >
              <input placeholder="Period" />
            </Form.Item>

            <Form.Item
              name="company"
              label="Company:"
              rules={[{ required: true, message: "Please enter the company" }]}
            >
              <input placeholder="Company" />
            </Form.Item>
            <Form.Item
              name="title"
              label="Title:"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description:"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <input placeholder="Description" />
            </Form.Item>
            <div className="flex justify-end space-x-2">
              <button
                className="border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowAddEditModal(false);
                }}
              >
                Cancel
              </button>
              <button className="bg-primary text-white px-5 py-2" type="submit">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminExperiences;
