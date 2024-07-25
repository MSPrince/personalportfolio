import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, message, Modal } from "antd";
import { hideLoading, ReloadData, showLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type , setType] = React.useState("add");

  const onFinish = async (values) => {
    try {
      console.log("Form values:", values); // Debugging
      const tempTechnologies = values.technologies.split(",");
      values.technologies = tempTechnologies;
      dispatch(showLoading());

      let response;
      if (selectedItemForEdit) {
        console.log("Updating project:", {
          ...values,
          _id: selectedItemForEdit._id,
          image: values.imageURL,
        });
        response = await axios.put("/api/portfolio/update-project", {
          ...values,
          _id: selectedItemForEdit._id,
          image: values.imageURL,
        });
      } else {
        console.log("Adding new project:", values);
        response = await axios.post("/api/portfolio/add-project", {
          ...values,
          image: values.imageURL,
        });
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
      let response = await axios.delete("/api/portfolio/delete-project", {
        data: { _id: item._id },
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
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 sm:grid-cols-1">
        {projects.map((project) => (
          <div
            className="shadow border-2 border-gray-400 p-5 text-justify rounded"
            key={project._id} // Ensure unique key
          >
            <h1 className="text-secondary text-xl font-bold text-center mb-3">
              {project.title}
            </h1>
            <img
              src={project.image}
              alt={project.title}
              className="h-40 w-80 rounded"
            />
            <h4 className="mt-2">
              <span className="font-bold text-[60]">Project Link:</span>{" "}
              <a href="">{project.link}</a>
            </h4>

            <p className="mt-1">
              <span className="font-bold text-xl text-tertiary">
                Description:
              </span>{" "}
              {project.description}
            </p>
            <div className="flex space-x-2 mt-4 justify-end gap-5">
              <button
                className="bg-red-600 text-white px-5 py-2 rounded-md"
                onClick={() => onDelete(project)}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2 rounded-md"
                onClick={() => {
                  setSelectedItemForEdit(project);
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

      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showAddEditModal}
          title={selectedItemForEdit ? "Edit Project" : "Add Project"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={
              selectedItemForEdit
                ? {
                    title: selectedItemForEdit.title,
                    imageURL: selectedItemForEdit.image,
                    description: selectedItemForEdit.description,
                    link: selectedItemForEdit.link,
                    technologies: selectedItemForEdit.technologies.join(", "),
                  }
                : {}
            }
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>

            <Form.Item
              name="imageURL"
              label="Image URL"
              rules={[
                { required: true, message: "Please enter the image URL" },
              ]}
            >
              <Input placeholder="Image URL" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <Input.TextArea placeholder="Project description" />
            </Form.Item>

            <Form.Item
              name="link"
              label="Link"
              rules={[
                { required: true, message: "Please enter the project link" },
              ]}
            >
              <Input placeholder="Project link" />
            </Form.Item>

            <Form.Item
              name="technologies"
              label="Used Technologies"
              rules={[
                {
                  required: true,
                  message: "Please enter the technologies used",
                },
              ]}
            >
              <Input placeholder="Technologies (comma separated)" />
            </Form.Item>

            <div className="flex justify-end space-x-2">
              <button
                className="border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowAddEditModal(false);
                  setSelectedItemForEdit(null);
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

export default AdminProjects;
