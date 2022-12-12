const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMailController = async (req, res) => {
  const desEmail = req.email;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.HOST_EMAIL_USER,
      pass: process.env.HOST_EMAIL_PASS,
    },
  });
  try {
    await transporter.sendMail({
      to: desEmail,
      subject: "this is demo test sendEmail",
      from: process.env.HOST_EMAIL_USER,
      text: "hello maofak",
    });
    res.status(200).json({ msg: "Email successfully sended!" });
  } catch (error) {
    res.status(500).json({ msg: "Send email error" });
  }
};

module.exports = sendMailController;
