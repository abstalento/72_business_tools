import BoardCard from "./card";

const YourBoard = () => {
  const data = {
    color: "#f59842",
    title: "New Board",

    color1: "#c798e3",
    title1: "New Board",

    color2: "#e0e0dc",
    title2: "Create Board",
  };

  return (
    <div>
      <div className="flex align-middle my-3">
        <img
          src="../images/avatar.png"
          className=""
          height={35}
          width={35}
          alt=""
        />
        <h1 className="text-base pl-3 font-bold  flex items-center ">
          Your Boards
        </h1>
      </div>
      <div className="flex w-screen">
        <BoardCard data={data} />
      </div>
    </div>
  );
};

export default YourBoard;
