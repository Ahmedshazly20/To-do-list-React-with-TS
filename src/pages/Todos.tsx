import useCustomQuery from "../hooks/useCustomQuery";
import axiosInstance from "../config/axios.config";
import { faker } from "@faker-js/faker";
import Paginator from './../component/ui/Pagnator';
import React,{ ChangeEvent, useState } from "react";
import AddTodo from './../component/AddTodo';

const TodosPage = () => {
    const storgeKey ="LoggedinUser"
    const userDataString= localStorage.getItem(storgeKey)
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const [page ,setpage]=useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>("DESC");

  const { isLoading, data, isFetching } = useCustomQuery({
    queryKey: [`todos-page-${page}`,`${pageSize}`,`${sortBy}`], //**todos */
    url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`, //**todos */

    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

//handlers 
 const onClicprev = ()=>{
  setpage(prev =>prev - 1 )
 }
 const onClicNext = ()=>{
  setpage(prev =>prev + 1 )
 }
 const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
  setPageSize(+e.target.value);
};
const onChangeSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
  setSortBy(e.target.value);
};

  if (isLoading) return <h3>Loading...</h3>;
  console.log(data);

  return (
    <div className="mt-24 container">
      <div className="flex ">
        <AddTodo/>
      <div className="flex items-center justify-between space-x-2 text-md">
          <select
            className="border-2 border-indigo-600 rounded-md p-2"
            value={sortBy}
            onChange={onChangeSortBy}
          >
            <option disabled>Sort by</option>
            <option value="ASC">Oldest</option>
            <option value="DESC">Latest</option>
          </select>
          <select
            className="border-2 border-indigo-600 rounded-md p-2"
            value={pageSize}
            onChange={onChangePageSize}
          >
            <option disabled>Page Size</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <div className=" mt-2 space-x-2  flex items-center justify-center ">   
      <div className="my-20 space-y-6">
        {data.data.length ? (
          data.data.map(
            ({id,attributes,}: {id: number;attributes: { todo: string };} ,idx:number) => {
              return (
                <div
                  key={id}
                  className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
                >
                 
                  <h3 className="w-full font-semibold">
                    {idx+1} - {attributes.todo}
                  </h3>
                </div>
              );
            }
          )
        ) : (
          <h3>No Todos Yet</h3>
        )}
        <Paginator page={page} isLoading={isLoading} onClickNext={onClicNext} onClickPrev={onClicprev} pageCount={data.meta.pagination.pageCount} total={data.meta.pagination.total} />
      </div>
      </div>
    </div>
  );
};

export default TodosPage;
