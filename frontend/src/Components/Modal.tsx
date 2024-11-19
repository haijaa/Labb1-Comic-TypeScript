import React, { useEffect, useState } from "react";
import { Icon } from "@mdi/react";
import { mdiPlus } from "@mdi/js";

interface publisher {
    id:number,
    name:string
}

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [character, setCharacter] = useState("");
  const [publisherid, setPublisherid] = useState("");
  const [publisher, setPublisher] = useState<publisher[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/publisher")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setPublisher(data);
      });
  }, []);

  const PostMagazine = async () => {
    const postOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        image,
        character,
        publisherid,
      }),
    };
    try {
      console.log(postOptions);
      await fetch("http://localhost:3000/api/magazines/post", postOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    } finally {
      window.location.reload();
    }
  };

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="flex items-center mt-10 mr-10 hover"
      >
        <p>Add a magazine</p>
        <Icon path={mdiPlus} size={2} />
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none text-white bg-black">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Add a magazine</h3>
              </div>
              <div className="relative p-6 flex-auto text-white">
                {image && <img src={image} className="max-h-62 max-w-60" />}
                <div>
                  <p>Title</p>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title..."
                    className="rounded-sm h-10 text-black"
                  />
                </div>
                <div>
                  <p>Picture</p>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Cover..."
                    className="rounded-sm h-10 textBlack"
                  />
                </div>
                <div>
                  <p>Description</p>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description..."
                    className="rounded-sm h-10 textBlack"
                  />
                </div>
                <div>
                  <p>Character</p>
                  <input
                    type="text"
                    value={character}
                    onChange={(e) => setCharacter(e.target.value)}
                    placeholder="Character..."
                    className="rounded-sm h-10 textBlack"
                  />
                </div>
                <div>
                  <p>Publisher</p>
                  <select
                    value={publisherid}
                    onChange={(event) => setPublisherid(event.target.value)}
                    className="rounded-sm h-10 textBlack"
                  >
                    <option value="">Select a publisher</option>{" "}
                    {publisher.map((pub) => (
                      <option key={pub.id} value={pub.id}>
                        {pub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-white bg-red-500 px-6 py-2 w-1/2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-green-500 text-white active:bg-emerald-600 text-sm px-6 py-2 w-1/2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    PostMagazine();
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}