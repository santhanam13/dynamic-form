import React, { useState } from "react";
import {
  PlusCircle,
  Trash2,
  GripVertical,
  Eye,
  Save,
  Layout,
  Settings,
  ChevronRight,
  ArrowRight,
  Code,
  Database,
} from "lucide-react";
 

const FIELD_TYPES = [
  { id: "text", label: "Text Input", icon: "⌨️" },
  { id: "number", label: "Number", icon: "#" },
  { id: "email", label: "Email", icon: "@" },
  { id: "select", label: "Dropdown", icon: "▼" },
  { id: "checkbox", label: "Checkbox", icon: "☑" },
];

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [activeTab, setActiveTab] = useState("editor");
  const [previewData, setPreviewData] = useState({});
  const [errors, setErrors] = useState({});
  const [activeField, setActiveField] = useState(null);

  const addField = (type) => {
    const newField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      placeholder: "",
      required: false,
      options: type === "select" ? ["Option 1", "Option 2"] : [],
    };
    setFields([...fields, newField]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Form Builder</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("editor")}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTab === "editor"
                    ? "bg-orange-600/20 text-orange-500 border border-orange-500/30"
                    : "hover:bg-gray-800 text-gray-400"
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTab === "preview"
                    ? "bg-orange-600/20 text-orange-500 border border-orange-500/30"
                    : "hover:bg-gray-800 text-gray-400"
                }`}
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          {activeTab === "editor" && (
            <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-6">
              {/* Field Types */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="font-medium text-gray-200">Field Types</h2>
                </div>
                <div className="p-2">
                  {FIELD_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => addField(type.id)}
                      className="w-full p-3 rounded-md text-left flex items-center gap-3
                        hover:bg-orange-500/10 hover:text-orange-500 transition-colors
                        group"
                    >
                      <span
                        className="w-8 h-8 flex items-center justify-center rounded-md
                        bg-gray-800 group-hover:bg-orange-500/20 text-orange-500"
                      >
                        {type.icon}
                      </span>
                      <span className="font-medium">{type.label}</span>
                      <ArrowRight
                        size={16}
                        className="ml-auto opacity-0 group-hover:opacity-100"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Stats */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 space-y-4">
                <h2 className="font-medium text-gray-200">Form Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 rounded-md p-3">
                    <div className="text-sm text-gray-400">Fields</div>
                    <div className="text-2xl font-semibold text-orange-500">
                      {fields.length}
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-md p-3">
                    <div className="text-sm text-gray-400">Required</div>
                    <div className="text-2xl font-semibold text-orange-500">
                      {fields.filter((f) => f.required).length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div
            className={`col-span-12 ${
              activeTab === "editor" ? "md:col-span-8 lg:col-span-9" : ""
            }`}
          >
            <div className="bg-gray-900 rounded-lg border border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <h2 className="font-medium text-gray-200">
                  {activeTab === "editor" ? "Form Layout" : "Form Preview"}
                </h2>
              </div>
              <div className="p-6">
                {fields.length === 0 ? (
                  <div className="text-center py-12">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/20 
                      flex items-center justify-center"
                    >
                      <Layout size={24} className="text-orange-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-300 mb-2">
                      Start Building
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      Add fields from the sidebar to begin creating your form
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className={`bg-gray-800/50 rounded-lg border ${
                          activeField === field.id
                            ? "border-orange-500/50 shadow-[0_0_0_1px_rgba(249,115,22,0.1)]"
                            : "border-gray-700"
                        }`}
                      >
                        {activeTab === "editor" ? (
                          <div className="p-4">
                            <div className="flex items-center gap-4 mb-4">
                              <GripVertical className="text-gray-500 cursor-move" />
                              <input
                                type="text"
                                value={field.label}
                                onChange={(e) => {
                                  const newFields = [...fields];
                                  newFields[index].label = e.target.value;
                                  setFields(newFields);
                                }}
                                className="flex-grow px-3 py-2 bg-gray-900 rounded-md border border-gray-700
                                  focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                                placeholder="Field Label"
                              />
                              <button
                                onClick={() =>
                                  setFields(
                                    fields.filter((_, i) => i !== index)
                                  )
                                }
                                className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-md
                                  transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <input
                                type="text"
                                value={field.placeholder}
                                onChange={(e) => {
                                  const newFields = [...fields];
                                  newFields[index].placeholder = e.target.value;
                                  setFields(newFields);
                                }}
                                className="px-3 py-2 bg-gray-900 rounded-md border border-gray-700
                                  focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                                placeholder="Placeholder text"
                              />
                              <label className="flex items-center gap-3 text-sm text-gray-300">
                                <input
                                  type="checkbox"
                                  checked={field.required}
                                  onChange={(e) => {
                                    const newFields = [...fields];
                                    newFields[index].required =
                                      e.target.checked;
                                    setFields(newFields);
                                  }}
                                  className="w-4 h-4 rounded border-gray-600 text-orange-500 
                                    focus:ring-orange-500/20"
                                />
                                Required field
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                              {field.label}
                              {field.required && (
                                <span className="text-orange-500 ml-1">*</span>
                              )}
                            </label>
                            <input
                              type={field.type}
                              placeholder={field.placeholder}
                              className="w-full px-3 py-2 bg-gray-900 rounded-md border border-gray-700
                                focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                            />
                          </div>
                        )}
                      </div>
                    ))}

                    {activeTab === "preview" && fields.length > 0 && (
                      <button
                        className="w-full mt-6 px-6 py-3 bg-orange-500 text-white rounded-md
                        hover:bg-orange-600 transition-colors"
                      >
                        Submit Form
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
