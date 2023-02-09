import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import { FlexyCard, WrappingCard } from "components/Card";
import { Modals1, Modals2 } from "components/Modals";
import Button from "components/Button";
import Layout from "components/Layout";
import Logo from "assets/logo.png";

interface ApprovalType {
  id: number;
  employee_name: string;
  created_at: string;
  approval_title: string;
  approval_status: string;
  approval_start_date: string;
  approval_description: string;
  approval_end_date: string;
  approval_image: string;
}

const Approval = () => {
  const [approvalStatus, setApprovalStatus] = useState<string>("");
  const [approvals, setApprovals] = useState<ApprovalType[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>();
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<string>();
  const [image, setImage] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [title, setTitle] = useState<string>();
  const [name, setName] = useState<string>();
  const [cookie, setCookie] = useCookies();
  const [id, setId] = useState<number>();
  const navigate = useNavigate();

  useEffect(() => {
    getApprovals();
  }, []);

  async function getApprovals() {
    {
      cookie.role === "admin" &&
        (await axios
          .get(`approvals`, {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          })
          .then((res) => {
            const { data } = res.data;
            setApprovals(data);
          })
          .catch((err) => {}));
    }
    {
      cookie.role === "employee" &&
        (await axios
          .get(`employee/approvals`, {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          })
          .then((res) => {
            const { data } = res.data;
            setApprovals(data);
          })
          .catch((err) => {}));
    }
  }

  async function getApprovalId(id: number) {
    await axios
      .get(`approvals/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setId(data.id);
        setName(data.employee_name);
        setCreatedAt(data.created_at);
        setTitle(data.approval_title);
        setStartDate(data.approval_start_date);
        setEndDate(data.approval_end_date);
        setStatus(data.approval_status);
        setImage(data.approval_image);
        setDesc(data.approval_description);
      })
      .catch((err) => {});
  }
  function editApproval(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = new FormData();
    body.append("approval_status", approvalStatus);
    axios
      .put(`approvals/${id}`, body, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { message } = res.data;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          text: message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(0)
      })
      .catch((err) => {
        const { data } = err.response;
        const { message } = data;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      });
  }

  return (
    <Layout approvalSet="w-full bg-gradient-to-r from-white to-navy hover:text-white ">
      {cookie.role === "admin" ? (
        <WrappingCard judul="Approval Requests">
          {approvals.map((data) => {
            return (
              <FlexyCard parentSet="active:scale-95" key={data.id}>
                <label
                  htmlFor="my-modal-1"
                  id={`btn-approval-detail-${data.id}`}
                  onClick={() => getApprovalId(data.id)}
                  
                >
                  <div className="flex justify-center items-center w-full hover:cursor-pointer">
                    <div className="text-center w-1/4">
                      <p className="text-black capitalize font-semibold">
                        {new Date(`${data.created_at}`)
                          .toString()
                          .substring(3, 15)}
                      </p>
                    </div>
                    <div className="text-center w-1/4">
                      <p className="text-black capitalize font-medium">
                        {data.employee_name}
                      </p>
                    </div>
                    <div className="text-center w-1/4">
                      <p className="text-black capitalize font-medium">
                        {data.approval_title}
                      </p>
                    </div>
                    <div className="text-center w-1/4">
                      <p
                        className={`${
                          data.approval_status === "rejected"
                            ? "text-red-500"
                            : "text-orange-500" &&
                              data.approval_status === "approved"
                            ? "text-green-500"
                            : "text-orange-500"
                        } capitalize font-bold`}
                      >
                        {data.approval_status}
                      </p>
                    </div>
                  </div>
                </label>
              </FlexyCard>
            );
          })}

          {/* modal detail approval start*/}
          <Modals2 no={1} titleModal="Detail Approval">
            <form onSubmit={editApproval}>
              <div className="box-border w-full bg-white rounded-2xl border-sky border-2 p-5">
                <div className="flex">
                  <div className="w-1/2 flex items-center">
                    <p className="text-black font-semibold text-xl">{name}</p>
                  </div>
                  <div className="w-1/2 flex justify-end items-center">
                    <img src={Logo} alt="" width={40} />
                  </div>
                </div>
                <div className="py-5">
                  <p className="text-black font-semibold text-md mb-5">
                    {new Date(`${startDate}`).toString().substring(3, 15)}{" "}
                    <span className="font-normal">to</span>{" "}
                    {new Date(`${endDate}`).toString().substring(3, 15)}
                  </p>
                  <p className="text-black font-normal text-md">{title}</p>
                  <p className="text-black font-normal text-md my-5">{desc}</p>
                  <div className="flex justify-center w-full">
                    <img src={`${image}`} className="w-[50%]" />
                  </div>
                </div>
              </div>
              <div className="modal-action">
                {
                  status === "pending"? (
                    <>
                    <button
                  id={`btn-approve-modals`}
                  type="submit"
                  className="w-24 text-sm text-center border-2 border-sky bg-sky rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900  active:scale-90"
                  onClick={() => setApprovalStatus("approved")}
                >
                  Approve
                </button>
                <button
                  id={`btn-reject-modals`}
                  type="submit"
                  className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                  onClick={() => setApprovalStatus("rejected")}
                >
                  Reject
                </button>
                    </>
                  ) : null
                }
                
              </div>
            </form>
          </Modals2>
        </WrappingCard>
      ) : (
        <WrappingCard
          judul="Approval"
          rightSide={
            <>
              <Button
                id="btn-request-approval"
                buttonSet="border-2 border-white shadow-md shadow-black rounded-full capitalize font-medium gap-2 px-3 text-xs hover:bg-navy w-1/3"
                label="Request Approval"
                onClick={() => navigate("/approval/request")}
              />
            </>
          }
        >
          {approvals.map((data) => {
            return (
              <FlexyCard parentSet="active:scale-95" key={data.id}>
                <label
                  htmlFor="my-modal-2"
                  id={`btn-detail-approval-${data.id}`}
                  onClick={() => getApprovalId(data.id)}
                >
                  <div className="flex justify-center items-center w-full">
                    <div className="text-start w-1/3 mx-5">
                      <p className="text-black capitalize font-semibold">
                        {new Date(`${data.created_at}`)
                          .toString()
                          .substring(3, 15)}
                      </p>
                    </div>
                    <div className="text-center w-1/3 mx-5">
                      <p className="text-black capitalize font-medium">
                        {data.approval_title}
                      </p>
                    </div>
                    <div className="text-end w-1/3 mx-5">
                      <p
                        className={`${
                          data.approval_status === "rejected"
                            ? "text-red-500"
                            : "text-orange-500" &&
                              data.approval_status === "approved"
                            ? "text-green-500"
                            : "text-orange-500"
                        } capitalize font-bold`}
                      >
                        {data.approval_status}
                      </p>
                    </div>
                  </div>
                </label>
              </FlexyCard>
            );
          })}

          <Modals1 no={2} titleModal="Detail Approval">
            <div className="box-border w-full bg-white rounded-2xl border-sky border-2 p-5">
              <div className="flex">
                <div className="w-1/2 flex items-center">
                  <p className="text-black font-semibold text-xl">{name}</p>
                </div>
                <div className="w-1/2 flex justify-end items-center">
                  <img src={Logo} alt="" width={40} />
                </div>
              </div>
              <div className="py-5">
                <p className="text-black font-semibold text-md mb-5">
                  {new Date(`${startDate}`).toString().substring(3, 15)}{" "}
                  <span className="font-normal">to</span>{" "}
                  {new Date(`${endDate}`).toString().substring(3, 15)}
                </p>
                <p className="text-black font-normal text-md">{title}</p>
                <p className="text-black font-normal text-md my-5">{desc}</p>
                <div className="flex justify-center w-full">
                  <img src={`${image}`} className="w-[50%]" />
                </div>
              </div>
            </div>
            <div className="modal-action">
              <label
                id={`btn-close-modals`}
                htmlFor="my-modal-2"
                className="w-24 text-sm text-center border-2 border-sky rounded-xl py-1 text-sky font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white active:scale-90"
              >
                Close
              </label>
            </div>
          </Modals1>
        </WrappingCard>
      )}
    </Layout>
  );
};

export default Approval;
