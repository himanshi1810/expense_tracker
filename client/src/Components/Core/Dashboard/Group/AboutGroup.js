import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MdOutlineBrowserUpdated } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoIosPersonAdd } from "react-icons/io";
import { MdAdd } from "react-icons/md";
function AboutGroup() {
  const {group} = useSelector((state) => state.group);
  console.log("Group : ", group);
  return (
    <div>
      <div>
        <div>
          <p>{group.groupName}</p>
        </div>
        <div>
          <button>
            <MdOutlineBrowserUpdated />
            Update
          </button>
          <button>
            <GrTransaction />
            BalanceSheet
          </button>
          <button>
            <IoIosPersonAdd></IoIosPersonAdd>
            Add Member
          </button>
          <button>
            <MdAdd></MdAdd>
            Add Expense
          </button>
        </div>
        <div>
          <div>

          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutGroup