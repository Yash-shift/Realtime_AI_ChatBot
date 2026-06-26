import { useState } from "preact/hooks";
import "./app.css";
import axios from "axios";
import Reactmarkdown from 'react-markdown'

export function App() {
  const [question, setQuestion] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    setLoading(true);

    axios
      .post("http://localhost:8000/ask", { question })
      .then((res) => {
        if (res.data._status) {
          setData(res.data.finaldata);
        }
      })
      .catch((err) => {
        console.log("Backend Response:", err.response?.data);
        console.log("Error:", err.message);
        setData("Something went wrong. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      <h1 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        Gemini AI Chat
      </h1>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[340px_1fr] gap-8">

        {/* Left Panel */}

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl"
        >
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            Ask Anything
          </h2>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your prompt here..."
            className="w-full h-72 bg-zinc-950 border border-zinc-700 rounded-xl p-4 text-zinc-200 placeholder:text-zinc-500 resize-none outline-none focus:border-cyan-500"
          />

          <button
            disabled={loading}
            className="w-full mt-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Generating..." : "Generate Content"}
          </button>
        </form>

        {/* Right Panel */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl flex flex-col overflow-hidden">

          <div className="border-b border-zinc-800 px-6 py-4">
            <h2 className="text-xl font-semibold text-cyan-400">
              AI Response
            </h2>
          </div>

          <div className="h-[650px] overflow-y-auto p-6">

            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse text-cyan-400 text-lg">
                  Gemini is thinking...
                </div>
              </div>
            ) : data ? (
              <div className="whitespace-pre-wrap leading-8 text-zinc-200">
               <Reactmarkdown>{data}</Reactmarkdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-500 text-lg">
                Ask something to get started 🚀
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
// import { useState } from "preact/hooks";
// import "./app.css";
// import axios from "axios";

// export function App() {
//   const [count, setCount] = useState(0);
//   let [question, setQuestion] = useState();

//   let [data, setData] = useState(null);

//   let handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//   .post("http://localhost:8000/ask", { question })
//   .then((res) => {
//     console.log(res.data);

//     if (res.data._status) {
//       setData(res.data.finaldata);
//     }
//   })
//   .catch((err) => {
//     console.log("Backend Response:", err.response?.data);
//     console.log("Error:", err.message);
//   });
//     // axios
//     //   .post("http://localhost:8000/ask", { question })
//     //   .then((res) => res.data)
//     //   .then((finalRes) => {
//     //     console.log(finalRes);
//     //     if(finalRes._status){
//     //       setData(finalRes.finalData)
//     //     }
//     //   });
//     // console.log(question);
//   };

//   return (
//     <>
//       <h1 className="text-center font-bold text-3xl my-6">
//         Gemini AI Chat App
//       </h1>

//       <div className="max-w-[1320px] mx-auto border grid grid-cols-[25%_75%] gap-5 p-5 rounded-lg shadow-md">
//         {/* Left Panel */}
//         <form
//           onSubmit={handleSubmit}
//           className="shadow-lg p-4 rounded-lg bg-white"
//         >
//           <textarea
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             className="w-full h-[250px] border rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your prompt..."
//           ></textarea>

//           <button
//             type="submit"
//             className="bg-blue-800 text-white w-full py-2 px-4 mt-3 rounded-md hover:bg-blue-900 transition"
//           >
//             Create Content
//           </button>
//         </form>

//         {/* Right Panel */}
//         <div className="border-l border-black pl-5">
//           <div className="h-[500px] overflow-y-auto p-4  bg-gray-50 rounded-md">
//             <p className="text-gray-500">
//               {data?data:''}
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
