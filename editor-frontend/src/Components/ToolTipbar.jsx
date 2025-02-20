import React from 'react'
import AnimatedTooltip from './ui/animated-tooltip'
import { people } from '../data/people'
import { FileUpload } from './ui/file_upload'

const ToolTipbar = ({handleFileUpload, filename, setFilename, getFileExtension, language}) => {
  return (
    <div className="flex flex-col  justify-around items-center">
          {/* tooltip */}
          <div className="w-[20vw] flex justify-center mt-16">
            <AnimatedTooltip items={people} />

          </div>

          {/* upload */}
          <div>
          <FileUpload onChange={handleFileUpload} />
          </div>

          {/* filename */}
          <div>
            <input
              type="text"
              className="px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
            <p className="text-gray-400 text-sm">Filename: {filename + getFileExtension(language)}</p>
          </div>
        </div>
  )
}

export default ToolTipbar