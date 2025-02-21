import { Form } from "@/components/ui/form";
import React from "react";
import ButtonComponent from "./ButtonComponent";

const FormComponent = ({ form, onSubmit,childElement }) => {
  return (
    <div className="py-4 px-3 md:px-7">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {childElement}
          <ButtonComponent label="Continue" />
        </form>
      </Form>
    </div>
  );
};

export default FormComponent;
