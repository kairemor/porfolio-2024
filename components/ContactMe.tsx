import React, { useState } from "react";
import { motion } from "framer-motion";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { PageInfo } from "../typings";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  pageInfo: PageInfo;
};

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type EmailPayload = {
  receiver: string;
  subject: string;
  content: string;
}

function ContactMe({ pageInfo }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();


  const sendEmail = async (receiver: string, subject: string, content: string): Promise<any> => {
    const payload: EmailPayload = {
      receiver: receiver,
      subject: subject,
      content: content,
    };
  
    const rawResponse = await fetch("https://services-y4sg.onrender.com/send-email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    return await rawResponse.json();
  };
 

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // window.location.href = `mailto:${pageInfo.email}?subject=${data.subject}&body=Hi, my name is ${data.name}. ${data.message}`;
    await sendEmail(  
      'kairemor@gmail.com', 
      `${data.subject} : from ${data.email}`,
      `Nom: ${data.name} \n \n  Content: ${data.message}`
    )

    const kmResponse = 
      `
        Bonjour ${data.name}, \n \n 

        C'est Mor Kaire, j'ai bien reçu votre email. Je reviendrais vers vous dans les plus brefs délais. \n \n \n 
      
        Cordialement, \n
        Mor Kaire
      `
      await sendEmail(data.email, 'Mor Kaire email sent', kmResponse)
      alert("Merci votre message est envoye");
      reset()
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 h-screen justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Contact
      </h3>

      <div className="flex flex-col space-y-10">
        <h4 className="text-4xl font-semibold text-center">
          I have got just what you need.{" "}
          <span className="decoration-[#F7AB0A]/50 underline">Lets Talk.</span>
        </h4>

        <div className="space-y-10">
          <div className="flex items-center space-x-5 justify-center">
            <PhoneIcon className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <p className="text-2xl">{pageInfo.phoneNumber}</p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <a className="text-2xl" href={`mailto:${pageInfo.email}`}>
              {pageInfo.email}
            </a>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <MapPinIcon className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <p className="text-2xl">{pageInfo.address}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 w-fit mx-auto"
        >
          <div className="flex space-x-2">
            <input
              className="contactInput"
              placeholder="Name"
              type="text"
              {...register("name")}
            />
            <input
              className="contactInput"
              placeholder="Email"
              type="text"
              {...register("email")}
            />
          </div>
          <input
            className="contactInput"
            placeholder="Subject"
            type="text"
            {...register("subject")}
          />
          <textarea
            className="contactInput h-36"
            placeholder="Message"
            {...register("message")}
          />

          <button
            type="submit"
            className="
            bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold text-lg "
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default ContactMe;
