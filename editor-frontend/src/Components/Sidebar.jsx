import React from 'react'
import { RiFolderFill } from "react-icons/ri";
import { demoFiles } from '../data/demofiles';
const Sidebar = ({setSidebarOpen, sidebarOpen}) => {
  return (
    <div className="w-[20vw]">
          <div className={`fixed left-0 top-0 h-full w-60 bg-gray-900 text-white shadow-lg transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}`}>
            <button onClick={() => setSidebarOpen(false)} className="absolute top-2 right-3 text-white text-xl">✖</button>
            <h2 className="p-4 text-lg font-bold border-b border-gray-700">Files</h2>
            <ul className="p-3">
              {demoFiles.map((file) => (
                <li key={file.name} className="p-2 hover:bg-gray-700 cursor-pointer" >
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="fixed left-2 top-2 bg-transparent">
            <RiFolderFill size={24} className="text-yellow-500 cursor-pointer" />
          </button>
        </div>
  )
}

export default Sidebar