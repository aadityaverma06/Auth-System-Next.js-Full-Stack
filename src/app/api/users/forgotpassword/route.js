import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/dbconnect.js";
import { User } from "@/models/user.models.js";
import bcrypt from "bcrypt";

connectDB();

export async function POST(request) {
  try {
    const { token, newPassword } = await request.json();
    const user = await User.findOne({
      forgotPasswordToken: decodeURIComponent(token),
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "User does not exist", status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password updated successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
