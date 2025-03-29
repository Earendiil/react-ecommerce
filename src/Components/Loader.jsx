import { ClipLoader } from "react-spinners"

const Loader = ({text}) => {

    return (

        <div className="flex justify-center items-center h-screen w-screen">
                    <p className="text-slate-800 text-4xl mr-2 ">
                        {text ? text : "Please wait"}</p>
                  <ClipLoader color="#36d7b7" loading={true} size={50} />
                </div>


    )
}

export default Loader;