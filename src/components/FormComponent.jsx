// FormComponent.jsx
import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const options = [
  "1. Visibility of system status",
  "2. Match between system and the real world",
  "3. User control and freedom",
  "4. Consistency and standards",
  "5. Error prevention",
  "6. Recognition rather than recall",
  "7. Flexibility and efficiency of use",
  "8. Aesthetic and minimalist design",
  "9. Help users recognize, diagnose, and recover from errors",
  "10. Help and documentation",
];

const role = ["1. General", "2. Student", "3. Teachers"];

const problemRate = [
  "1. No problem",
  "2. Cosmetic problem only",
  "3. Minor usability problem",
  "4. Major usability problem",
  "5. Usability catastrophe",
];

const FormComponent = () => {
  const [description, setDescription] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [user, setUser] = useState("R3");
  const [selectedProblemRate, setSelecteProblemRate] = useState("");
  const [imageData, setImageData] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user,
      description,
      suggestion,
      selectedOptions,
      selectedRole,
      selectedProblemRate,
      timestamp: new Date().toISOString(),
      image: imageData,
    };
    try {
      await axios.post("http://localhost:3001/submissions", data);
      setDescription("");
      setSuggestion("");
      setSelectedOptions([]);
    } catch (error) {
      console.error("Virhe lähetyksessä:", error);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageData(`images/${file.name}`);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Tutkimuslomake</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Käyttäjä
          </label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ongelman kuvaus
          </label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Korjaus ehdotus
          </label>
          <textarea
            type="text"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <hr></hr>
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-2">
            Valitse vaihtoehdot
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {options.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <hr></hr>
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-2">
            Ongelman kokija
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {role.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option}
                  checked={selectedRole === option}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <hr></hr>
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-2">
            Ongelman vakavuus
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {problemRate.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option}
                  checked={selectedProblemRate === option}
                  onChange={(e) => setSelecteProblemRate(e.target.value)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <hr></hr>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lisää kuva (drag & drop)
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded p-6 text-center cursor-pointer ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Pudota kuva tähän...</p>
            ) : (
              <p>Raahaa kuva tähän tai klikkaa valitaksesi tiedoston</p>
            )}
          </div>

          {imageData && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-1">Esikatselu:</p>
              <img
                src={imageData}
                alt="Esikatselu"
                className="max-w-xs rounded shadow"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Lähetä
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
