// "use client";
// import React, { useState, useEffect } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form } from "@/components/ui/form";
// import {
//   AddressSelect,
//   CountrySelect,
//   StateSelect,
// } from "../shadcnComponents/ComboboxDemo";
// import SimpleFormFields from "../shadcnComponents/SimpleFormFields";
// import { Button } from "@/components/ui/button";
// import { BuyerSchema } from "@/shadcnComponents/schemas";

// export function BuyerDetailsForm() {
//   const [isBillingSame, setIsBillingSame] = useState(true);

//   const BuyerForm = useForm<z.infer<typeof BuyerSchema>>({
//     resolver: zodResolver(BuyerSchema),
//     defaultValues: {
//       shipping_pickup_address: "",
//       shipping_firstname: "",
//       shipping_lastname: "",
//       shipping_mobile: "",
//       shipping_alternate_mobile: "",
//       shipping_email: "",
//       shipping_country: "",
//       shipping_address1: "",
//       shipping_address2: "",
//       shipping_pincode: "",
//       shipping_city: "",
//       shipping_state: "",
//       isBillingSame: true,
//       billing_firstname: "",
//       billing_lastname: "",
//       billing_mobile: "",
//       billing_country: "",
//       billing_address1: "",
//       billing_address2: "",
//       billing_pincode: "",
//       billing_city: "",
//       billing_state: "",
//     },
//   });

//   useEffect(() => {
//     if (isBillingSame) {
//       BuyerForm.setValue(
//         "billing_firstname",
//         BuyerForm.getValues("shipping_firstname")
//       );
//       BuyerForm.setValue(
//         "billing_lastname",
//         BuyerForm.getValues("shipping_lastname")
//       );
//       BuyerForm.setValue(
//         "billing_mobile",
//         BuyerForm.getValues("shipping_mobile")
//       );
//       BuyerForm.setValue(
//         "billing_country",
//         BuyerForm.getValues("shipping_country")
//       );
//       BuyerForm.setValue(
//         "billing_address1",
//         BuyerForm.getValues("shipping_address1")
//       );
//       BuyerForm.setValue(
//         "billing_address2",
//         BuyerForm.getValues("shipping_address2")
//       );
//       BuyerForm.setValue(
//         "billing_pincode",
//         BuyerForm.getValues("shipping_pincode")
//       );
//       BuyerForm.setValue("billing_city", BuyerForm.getValues("shipping_city"));
//       BuyerForm.setValue(
//         "billing_state",
//         BuyerForm.getValues("shipping_state")
//       );
//     }
//   }, [
//     isBillingSame,
//     BuyerForm.watch("shipping_firstname"),
//     BuyerForm.watch("shipping_lastname"),
//     BuyerForm.watch("shipping_mobile"),
//     BuyerForm.watch("shipping_country"),
//     BuyerForm.watch("shipping_address1"),
//     BuyerForm.watch("shipping_address2"),
//     BuyerForm.watch("shipping_pincode"),
//     BuyerForm.watch("shipping_city"),
//     BuyerForm.watch("shipping_state"),
//   ]);

//   const onSubmit = () => {
//     console.log("BuyerForm Data:", BuyerForm.getValues());
//   };

//   return (
//     <Form {...BuyerForm}>
//       <label className="text-xl font-bold">Select Pickup Address</label>
//       <div className="mt-10" />
//       <AddressSelect form={BuyerForm} name="shipping_pickup_address" />
//       <hr className="my-10" />
//       <p className="text-xl font-bold my-10">Buyer Shipping Details</p>

//       <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//           <SimpleFormFields
//             form={BuyerForm}
//             label="First Name"
//             name="shipping_firstname"
//             type="text"
//             required
//           />
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Last Name"
//             name="shipping_lastname"
//             type="text"
//             required
//           />
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Mobile no."
//             name="shipping_mobile"
//             type="text"
//             required
//           />
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Alternate Mobile"
//             name="shipping_alternate_mobile"
//             type="text"
//           />
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Email"
//             name="shipping_email"
//             type="email"
//             className="col-span-2"
//             required
//           />
//         </div>
//         <CountrySelect form={BuyerForm} name="shipping_country" required />
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Address1"
//             name="shipping_address1"
//             type="text"
//             required
//           />
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Address2"
//             name="shipping_address2"
//             type="text"
//           />
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Pincode"
//             name="shipping_pincode"
//             type="text"
//             required
//           />
//           <SimpleFormFields
//             form={BuyerForm}
//             label="City"
//             name="shipping_city"
//             type="text"
//             required
//           />
//           <StateSelect form={BuyerForm} name="shipping_state" required />
//         </div>
//         <div
//           className="flex gap-2 mt-10 items-center cursor-pointer"
//           onClick={() => setIsBillingSame(!isBillingSame)}
//         >
//           <input
//             type="checkbox"
//             className="w-4 h-4 cursor-pointer"
//             checked={isBillingSame}
//             onChange={() => setIsBillingSame(!isBillingSame)}
//           />
//           <p className="text-sm font-medium">
//             Shipping & Billing Address are same.
//           </p>
//         </div>
//         {!isBillingSame && (
//           <div className="space-y-6">
//             <p className="text-xl font-bold my-10">Buyer Billing Details</p>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="First Name"
//                 name="billing_firstname"
//                 type="text"
//                 required
//               />
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="Last Name"
//                 name="billing_lastname"
//                 type="text"
//                 required
//               />
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="Mobile no."
//                 name="billing_mobile"
//                 type="text"
//                 required
//               />
//             </div>
//             <CountrySelect form={BuyerForm} name="billing_country" required />
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="House No."
//                 name="billing_address1"
//                 type="text"
//                 required
//               />
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="Street Name"
//                 name="billing_address2"
//                 type="text"
//               />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="Pincode"
//                 name="billing_pincode"
//                 type="text"
//                 required
//               />
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="City"
//                 name="billing_city"
//                 type="text"
//                 required
//               />
//               <StateSelect form={BuyerForm} name="billing_state" required />
//             </div>
//           </div>
//         )}

//         <div className="flex justify-end my-10">
//           <Button type="button" onClick={onSubmit} className="bg-blue-500">
//             Continue
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }



// "use client";
// import React, { useState, useEffect } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form } from "@/components/ui/form";
// import {
//   AddressSelect,
//   CountrySelect,
//   StateSelect,
// } from "../shadcnComponents/ComboboxDemo";
// import SimpleFormFields from "../shadcnComponents/SimpleFormFields";
// import { Button } from "@/components/ui/button";
// import { BuyerSchema } from "@/shadcnComponents/schemas";

// export function BuyerDetailsForm() {
//   const [isBillingSame, setIsBillingSame] = useState(true);

//   const BuyerForm = useForm<z.infer<typeof BuyerSchema>>({
//     resolver: zodResolver(BuyerSchema),
//     defaultValues: {
//       shipping_pickup_address: "",
//       shipping_firstname: "",
//       shipping_lastname: "",
//       shipping_mobile: "",
//       shipping_alternate_mobile: "",
//       shipping_email: "",
//       shipping_country: "",
//       shipping_address1: "",
//       shipping_address2: "",
//       shipping_pincode: "",
//       shipping_city: "",
//       shipping_state: "",
//       isBillingSame: true,
//       billing_firstname: "",
//       billing_lastname: "",
//       billing_mobile: "",
//       billing_country: "",
//       billing_address1: "",
//       billing_address2: "",
//       billing_pincode: "",
//       billing_city: "",
//       billing_state: "",
//     },
//   });

//   useEffect(() => {
//     if (isBillingSame) {
//       BuyerForm.setValue(
//         "billing_firstname",
//         BuyerForm.getValues("shipping_firstname")
//       );
//       BuyerForm.setValue(
//         "billing_lastname",
//         BuyerForm.getValues("shipping_lastname")
//       );
//       BuyerForm.setValue(
//         "billing_mobile",
//         BuyerForm.getValues("shipping_mobile")
//       );
//       BuyerForm.setValue(
//         "billing_country",
//         BuyerForm.getValues("shipping_country")
//       );
//       BuyerForm.setValue(
//         "billing_address1",
//         BuyerForm.getValues("shipping_address1")
//       );
//       BuyerForm.setValue(
//         "billing_address2",
//         BuyerForm.getValues("shipping_address2")
//       );
//       BuyerForm.setValue(
//         "billing_pincode",
//         BuyerForm.getValues("shipping_pincode")
//       );
//       BuyerForm.setValue("billing_city", BuyerForm.getValues("shipping_city"));
//       BuyerForm.setValue(
//         "billing_state",
//         BuyerForm.getValues("shipping_state")
//       );
//     }
//   }, [
//     isBillingSame,
//     BuyerForm.watch("shipping_firstname"),
//     BuyerForm.watch("shipping_lastname"),
//     BuyerForm.watch("shipping_mobile"),
//     BuyerForm.watch("shipping_country"),
//     BuyerForm.watch("shipping_address1"),
//     BuyerForm.watch("shipping_address2"),
//     BuyerForm.watch("shipping_pincode"),
//     BuyerForm.watch("shipping_city"),
//     BuyerForm.watch("shipping_state"),
//   ]);

//   const onSubmit = async () => {
//     const isValid = await BuyerForm.trigger();
//     if (isValid) {
//       console.log("BuyerForm Data:", BuyerForm.getValues());
//     } else {
//       console.log("Validation failed!");
//     }
//   };

//   return (
//     <Form {...BuyerForm}>
//       <label className="text-xl font-bold">Select Pickup Address</label>
//       <div className="mt-10" />
//       <AddressSelect form={BuyerForm} name="shipping_pickup_address" />
//       <hr className="my-10" />
//       <p className="text-xl font-bold my-10">Buyer Shipping Details</p>

//       <form className="space-y-6" onSubmit={BuyerForm.handleSubmit(onSubmit)}>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//           <SimpleFormFields
//             form={BuyerForm}
//             label="First Name"
//             name="shipping_firstname"
//             type="text"
//             required
//           />
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Last Name"
//             name="shipping_lastname"
//             type="text"
//             required
//           />
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Mobile no."
//             name="shipping_mobile"
//             type="text"
//             required
//           />
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Alternate Mobile"
//             name="shipping_alternate_mobile"
//             type="text"
//           />
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Email"
//             name="shipping_email"
//             type="email"
//             className="col-span-2"
//             required
//           />
//         </div>
//         <CountrySelect form={BuyerForm} name="shipping_country" required />
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Address1"
//             name="shipping_address1"
//             type="text"
//             required
//           />
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Address2"
//             name="shipping_address2"
//             type="text"
//           />
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//           <SimpleFormFields
//             form={BuyerForm}
//             label="Pincode"
//             name="shipping_pincode"
//             type="text"
//             required
//           />
//           <SimpleFormFields
//             form={BuyerForm}
//             label="City"
//             name="shipping_city"
//             type="text"
//             required
//           />
//           <StateSelect form={BuyerForm} name="shipping_state" required />
//         </div>
//         <div
//           className="flex gap-2 mt-10 items-center cursor-pointer"
//           onClick={() => setIsBillingSame(!isBillingSame)}
//         >
//           <input
//             type="checkbox"
//             className="w-4 h-4 cursor-pointer"
//             checked={isBillingSame}
//             onChange={() => setIsBillingSame(!isBillingSame)}
//           />
//           <p className="text-sm font-medium">
//             Shipping & Billing Address are same.
//           </p>
//         </div>
//         {!isBillingSame && (
//           <div className="space-y-6">
//             <p className="text-xl font-bold my-10">Buyer Billing Details</p>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="First Name"
//                 name="billing_firstname"
//                 type="text"
//                 required
//               />
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="Last Name"
//                 name="billing_lastname"
//                 type="text"
//                 required
//               />
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="Mobile no."
//                 name="billing_mobile"
//                 type="text"
//                 required
//               />
//             </div>
//             <CountrySelect form={BuyerForm} name="billing_country" required />
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="House No."
//                 name="billing_address1"
//                 type="text"
//                 required
//               />
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="Street Name"
//                 name="billing_address2"
//                 type="text"
//               />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="Pincode"
//                 name="billing_pincode"
//                 type="text"
//                 required
//               />
//               <SimpleFormFields
//                 form={BuyerForm}
//                 label="City"
//                 name="billing_city"
//                 type="text"
//                 required
//               />
//               <StateSelect form={BuyerForm} name="billing_state" required />
//             </div>
//           </div>
//         )}

//         <div className="flex justify-end my-10">
//           <Button type="button" onClick={onSubmit} className="bg-blue-500">
//             Continue
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }



// "use client";
// import React, { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form } from "@/components/ui/form";
// import {
//   AddressSelect,
//   CountrySelect,
//   StateSelect,
// } from "../shadcnComponents/ComboboxDemo";
// import SimpleFormFields from "../shadcnComponents/SimpleFormFields";
// import { Button } from "@/components/ui/button";
// import {
//   BuyerBillingSchema,
//   BuyerShippingSchema,
// } from "../shadcnComponents/schemas";

// export function BuyerDetailsForm() {
//   const [isBillingAddress, setIsBillingAddress] = useState(true);
//   const handleShowBillingAddress = () => {
//     setIsBillingAddress(!isBillingAddress);
//   };

//   const shippingForm = useForm<z.infer<typeof BuyerShippingSchema>>({
//     resolver: zodResolver(BuyerShippingSchema),
//     defaultValues: {
//       pickup_address: "",
//       firstname: "",
//       lastname: "",
//       mobile: "",
//       alternate_mobile: "",
//       email: "",
//       country: "",
//       address1: "",
//       address2: "",
//       pincode: "",
//       city: "",
//       state: "",
//     },
//   });

//   const billingForm = useForm<z.infer<typeof BuyerBillingSchema>>({
//     resolver: zodResolver(BuyerBillingSchema),
//     defaultValues: {
//       country: "",
//       firstname: "",
//       lastname: "",
//       mobile: "",
//       address1: "",
//       address2: "",
//       pincode: "",
//       city: "",
//       state: "",
//     },
//   });

//   const onSubmit = async () => {
//     const shippingValidation = await shippingForm.trigger();
//     const billingValidation = isBillingAddress
//       ? await billingForm.trigger()
//       : true;

//     if (shippingValidation && billingValidation) {
//       const shippingData = shippingForm.getValues();
//       const billingData = isBillingAddress
//         ? billingForm.getValues()
//         : shippingData;

//       console.log("Shipping Data:", shippingData);
//       console.log("Billing Data:", billingData);
//     }
//   };

//   return (
//     <Form {...shippingForm}>
//       <label htmlFor="email" className="text-xl font-bold">
//         Select Pickup Address
//       </label>
//       <div className="mb-10"></div>
//       <AddressSelect form={shippingForm} name="pickup_address" />

//       <hr className="my-10" />
//       <p className="text-xl font-bold my-10">Buyer Shipping Details</p>

//       <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//           <SimpleFormFields
//             form={shippingForm}
//             label="First Name"
//             name="firstname"
//             type="text"
//             required={true}
//           />
//           <SimpleFormFields
//             form={shippingForm}
//             label="Last Name"
//             name="lastname"
//             type="text"
//             required={true}
//           />
//           <SimpleFormFields
//             form={shippingForm}
//             label="Mobile no."
//             name="mobile"
//             type="text"
//             required={true}
//           />
//           <SimpleFormFields
//             form={shippingForm}
//             label="Alternate Mobile"
//             name="alternate_mobile"
//             type="text"
//           />
//           <SimpleFormFields
//             form={shippingForm}
//             label="Email"
//             name="email"
//             type="email"
//             className="col-span-2"
//             required={true}
//           />
//         </div>
//         <CountrySelect form={shippingForm} name="country" required={true}/>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//           <SimpleFormFields
//             form={shippingForm}
//             label="Address1"
//             name="address1"
//             type="text"
//             required={true}
//           />
//           <SimpleFormFields
//             form={shippingForm}
//             label="Address2"
//             name="address2"
//             type="text"
//             required={true}
//           />
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//           <SimpleFormFields
//             form={shippingForm}
//             label="Pincode"
//             name="pincode"
//             type="text"
//             required={true}
//           />
//           <SimpleFormFields
//             form={shippingForm}
//             label="City"
//             name="city"
//             type="text"
//             required={true}
//           />
//           <StateSelect form={shippingForm} name="state" required={true} />
//         </div>

//         <div
//           className="flex gap-2 mt-10 items-center cursor-pointer"
//           onClick={handleShowBillingAddress}
//         >
//           <input
//             type="checkbox"
//             className="w-4 h-4 cursor-pointer"
//             checked={isBillingAddress}
//             onChange={handleShowBillingAddress}
//           />
//           <p className="text-sm font-medium">
//             Shipping & Billing Address are same.
//           </p>
//         </div>

//         {!isBillingAddress && (
//           <div className="space-y-6">
//             <p className="text-xl font-bold my-10">Buyer Billing Details</p>
//             <Form {...billingForm}>
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//                 <SimpleFormFields
//                   form={billingForm}
//                   label="First Name"
//                   name="firstname"
//                   type="text"
//                   required={true}
//                 />
//                 <SimpleFormFields
//                   form={billingForm}
//                   label="Last Name"
//                   name="lastname"
//                   type="text"
//                   required={true}
//                 />
//                 <SimpleFormFields
//                   form={billingForm}
//                   label="Mobile no."
//                   name="mobile"
//                   type="text"
//                   required={true}
//                 />
//               </div>
//               <CountrySelect form={billingForm} name="country" required={true}/>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//                 <SimpleFormFields
//                   form={billingForm}
//                   label="House No."
//                   name="address1"
//                   type="text"
//                   required={true}
//                 />
//                 <SimpleFormFields
//                   form={billingForm}
//                   label="Street Name"
//                   name="address2"
//                   type="text"
//                 />
//               </div>
//               <SimpleFormFields
//                 form={billingForm}
//                 label="Locality"
//                 name="locality"
//                 type="text"
//                 required={true}
//               />
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//                 <SimpleFormFields
//                   form={billingForm}
//                   label="Pincode"
//                   name="pincode"
//                   type="text"
//                   required={true}
//                 />
//                 <SimpleFormFields
//                   form={billingForm}
//                   label="City"
//                   name="city"
//                   type="text"
//                   required={true}
//                 />
//                 <StateSelect form={billingForm} name="state" required={true}/>
//               </div>
//             </Form>
//           </div>
//         )}

//         <div className="flex justify-end my-10">
//           <Button type="button" onClick={onSubmit} className="bg-blue-500">
//             Continue
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }



  //   useEffect(() => {
  //     console.log(OrderForm.watch("id"));
  //   }, [
  //     OrderForm.watch("length"),
  //     OrderForm.watch("breadth"),
  //     OrderForm.watch("actual_weight"),
  //     OrderForm.watch("height"),
  //     OrderForm.watch("invoice_no"),
  //   ]);
  //   console.log(OrderForm.watch());