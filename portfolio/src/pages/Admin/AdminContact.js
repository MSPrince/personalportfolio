import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/rootSlice";
import axios from "axios";

// Define the action to update the Redux store
const updatePortfolioData = (data) => ({
  type: "UPDATE_PORTFOLIO_DATA",
  payload: data,
});

function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      console.log("Form Values:", values); // Log form values
      const response = await axios.put("/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData.contact._id,
      });
      dispatch(hideLoading());

      if (response.data.success) {
        message.success("Contact updated successfully");
        // Update Redux store with new contact information
        dispatch(updatePortfolioData(response.data.data));
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
        initialValues={portfolioData.contact}
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item name="gender" label="Gender">
          <Input placeholder="Gender" />
        </Form.Item>

        <Form.Item name="age" label="Age">
          <Input type="number" placeholder="Age" />
        </Form.Item>

        <Form.Item name="email" label="Email">
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item name="mobile" label="Mobile Number">
          <Input placeholder="Mobile Number" />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input placeholder="Address" />
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

export default AdminContact;
