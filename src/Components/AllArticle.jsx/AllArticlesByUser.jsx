/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import ArticleCard from "../ArticleCard/ArticleCard";
import { LuFilter } from "react-icons/lu";
import { useState } from "react";

const AllArticlesByUser = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const axiosCommon = useAxiosCommon();

  //   for search
  const { data: allArticle = [] } = useQuery({
    queryKey: ["all-article", search,filter],

    queryFn: async () => {
      const res = await axiosCommon.get(
        `/all-article-by-search-status-flitter?status=approved&search=${search}&filter=${filter}`
      );
      // console.log(res.data);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
    //  console.log(text)
  };
  return (
    <div>
      {/* search  */}

      <div className=" flex justify-between items-center my-10">
        <form onSubmit={handleSearch}>
          <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type="text"
              name="search"
              placeholder="Article Title"
            />

            <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
              Search
            </button>
          </div>
        </form>

        <div>
          <select
            className="select select-error w-full max-w-xs"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option defaultValue="">
              Filter By Publisher &Tags 
            </option>
            <option value="Daily Star">Daily Star</option>
            <option value="Prothom Alo">Prothom Alo</option>
            <option value="Bangladesh Pratidin">Bangladesh Pratidin</option>
            <option value="Financial Express">The Financial Express</option>
            <option value="Dhaka"> Dhaka Tribune</option>
            <option value="kakler_konto"> Kaler Kantho</option>
            <option value="New_Age"> New Age</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">EntertainmentT</option>
            <option value="Dhaka"> Dhaka Tribune</option>
            <option value="Technology"> Technology</option>
            <option value="Health"> Health</option>
          </select>
        </div>
      </div>
      <div className=" lg:grid-cols-3 grid md:grid-cols-2 gap-5 my-7">
        {allArticle.map((a) => (
          <ArticleCard key={a._id} a={a}></ArticleCard>
        ))}
      </div>
    </div>
  );
};

export default AllArticlesByUser;
