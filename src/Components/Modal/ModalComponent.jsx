import RTButton from "../../shared/RTButton";
import { Trash2 } from "lucide-react";

function ModalComponent({ buttons, title, subTitle }) {
  return (
    <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center z-50">
      {/* hoverlay  */}
      <div className="modal-overlay absolute w-screen h-screen bg-gray-900 opacity-50" />

      <div className="max-w-4xl mx-auto px-10 py-1 bg-white rounded-lg shadow-lg z-50">
        <div className="flex flex-col justify-center py-4 items-center">
          <div className="flex justify-center items-center mb-3 w-28 h-28 relative">
            <Trash2 size={50} />
          </div>
          <h1 className="text-gray-700 font-medium text-xl text-center mb-3">
            {title}
          </h1>
          <p className="text-gray-500 text-center mb-6">{subTitle}</p>
          <div className="flex  justify-center gap-2">
            {buttons?.map(({ label, onClick, className, ...rest }) => (
              <RTButton
                key={label}
                onClick={onClick}
                className={`flex items-center px-4 py-2 ${className}`}
                //   onClick={() => router.push(locationPath?.login)}
                {...rest}
              >
                {label}
              </RTButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;
