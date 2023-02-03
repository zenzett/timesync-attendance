import { IoReturnUpBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import React from "react";

import building from "assets/building.svg";
import { WrappingCard } from "components/Card";
import Button from "components/Button";
import Layout from "components/Layout";

const CompanyProfile = () => {
  return (
    <Layout profileSet="w-full bg-gradient-to-r from-white to-navy hover:text-white">
      <WrappingCard
        judul="Company Profile"
        rightSide={
          <Link to="/employeeprofile">
            <Button
              buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-2 px-3 text-xs"
              icon={<IoReturnUpBack size={20} />}
              label="Back to Employee's Profile"
            />
          </Link>
        }
      >
        <div className="flex w-full">
          <div className="w-2/6 flex flex-col items-center gap-4">
            <img
              className="w-60 border-2 border-sky rounded-xl "
              src={building}
              alt="photo"
            />
          </div>
          <div className="w-4/6 flex flex-col">
            <p className="font-bold text-3xl">Timesync Company</p>
            <p className="text-lg pb-8">Technology and Software Consultant</p>
            <table className="table-auto text-xl font-bold flex flex-col gap-4">
              <tr className="flex">
                <td className="w-2/5">Phone</td>
                <td className="w-full">081299998888</td>
              </tr>
              <tr className="flex">
                <td className="w-2/5">Email</td>
                <td className="w-full">aryoyudhanto@gmail.com</td>
              </tr>
              <tr className="flex">
                <td className="w-2/5">Social Media</td>
                <td className="w-full">@timesync</td>
              </tr>
              <tr className="flex">
                <td className="w-2/5">Address</td>
                <td className="w-full">
                  Jl. Jalandikuburan No.13, Kec. Mangga Dua, Kel.Cimanggis,
                  Duren Sawit, Jakarta Timur
                </td>
              </tr>
              <tr className="flex">
                <td className="w-2/5">Desc</td>
                <td className="w-full">
                  We are a company that moves in technology and software
                  industry.
                </td>
              </tr>
            </table>
          </div>
        </div>
      </WrappingCard>
    </Layout>
  );
};

export default CompanyProfile;
