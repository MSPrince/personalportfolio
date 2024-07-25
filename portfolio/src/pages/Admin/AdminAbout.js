import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/rootSlice";
import axios from "axios";

const { TextArea } = Input;

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      // Fix variable name typo
      const tempSkills = values.skills.split(",");
      values.skills = tempSkills; // Correct variable name

      dispatch(showLoading());
      const response = await axios.post("/api/portfolio/update-about", {
        ...values,
        _id: portfolioData.about._id,
      });
      dispatch(hideLoading());

      if (response.data.success) {
        message.success(response.data.message);
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
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...portfolioData.about,
          // Ensure skills is joined correctly for the initialValues
          skills: (portfolioData.about.skills || []).join(","),
        }}
      >
        <Form.Item name="lottiURL" label="Lotti URL">
          <Input placeholder="Lotti Url" />
        </Form.Item>

        <Form.Item name="description1" label="Description 1:">
          <TextArea placeholder="Description1" rows={4} />
        </Form.Item>

        <Form.Item name="description2" label="Description 2:">
          <TextArea placeholder="Description2" rows={4} />
        </Form.Item>

        <Form.Item name="skills" label="Skills : ">
          <TextArea placeholder="Skills" rows={4} />
        </Form.Item>

        <div className="flex justify-end w-full">
          <Button
            className="px-10 py-2 bg-primary text-white"
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;
