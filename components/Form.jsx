import { categories } from "../data";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";

const Form = ({ type, work, setWork, handleSubmit }) => {
  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setWork((prevWork) => ({
      ...prevWork,
      photos: [...prevWork.photos, ...newPhotos],
    }));
  };

  const handleRemovePhoto = (indexToRemove) => {
    setWork((prevWork) => ({
      ...prevWork,
      photos: prevWork.photos.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWork((prevWork) => ({
      ...prevWork,
      [name]: value,
    }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 px-4 py-8">
      <h1 className="text-2xl font-bold">{type} Your Work</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <h3 className="font-semibold mb-2">Which of these categories best describes your work?</h3>
          <div className="flex flex-wrap gap-4">
            {categories?.map((item, index) => (
              <p
                key={index}
                className={`text-sm cursor-pointer px-3 py-1 rounded-md transition ${
                  work.category === item ? "font-semibold text-blue-500" : "text-gray-600"
                } hover:opacity-80`}
                onClick={() => setWork({ ...work, category: item })}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Add some photos of your work</h3>

          {work.photos.length < 1 && (
            <div className="flex justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                id="image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUploadPhotos}
                multiple
              />
              <label htmlFor="image" className="flex flex-col items-center cursor-pointer text-sm text-gray-600">
                <IoIosImages className="text-4xl text-blue-400 mb-2" />
                <p>Upload from your device</p>
              </label>
            </div>
          )}

          {work.photos.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {work?.photos?.map((photo, index) => (
                <div key={index} className="relative w-32 h-32 border rounded overflow-hidden">
                  <img
                    src={photo instanceof Object ? URL.createObjectURL(photo) : photo}
                    alt="work"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white p-1 rounded-full text-red-500 hover:bg-gray-100"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <BiTrash />
                  </button>
                </div>
              ))}
              <input
                id="image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUploadPhotos}
                multiple
              />
              <label
                htmlFor="image"
                className="flex flex-col justify-center items-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-gray-600"
              >
                <IoIosImages className="text-3xl text-blue-400 mb-1" />
                <p className="text-xs text-center px-2">Upload from your device</p>
              </label>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="font-medium">Title</p>
            <input
              type="text"
              placeholder="Title"
              onChange={handleChange}
              name="title"
              value={work.title}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <p className="font-medium">Description</p>
            <textarea
              placeholder="Description"
              onChange={handleChange}
              name="description"
              value={work.description}
              required
              className="w-full p-2 border rounded h-32 resize-none"
            />
          </div>

          <div>
            <p className="font-medium">Now, set your PRICE</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">$</span>
              <input
                type="number"
                placeholder="Price"
                onChange={handleChange}
                name="price"
                value={work.price}
                required
                className="w-40 p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          PUBLISH YOUR WORK
        </button>
      </form>
    </div>
  );
};

export default Form;