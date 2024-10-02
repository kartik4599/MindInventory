import { Button } from "./components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Bell } from "lucide-react";
import DialogTask from "./DialogTask";
import { useEffect, useState } from "react";
import { deleteTask, getTask, postTask, putTask } from "./api";
import { io } from "socket.io-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

const App = () => {
  const [modelState, setModelState] = useState<"add" | "edit" | null>(null);
  const [currentData, setCurrentData] = useState<{
    name: string;
    deadline: string;
    id?: number;
  } | null>(null);

  const [notification, setNotification] = useState<{
    name: string;
    id: number;
  } | null>(null);

  const [data, setData] = useState<
    { name: string; deadline: string; id: number }[]
  >([]);

  // Socket Handler
  const socketHandler = () => {
    const socket = io("http://localhost:4000");
    console.log(socket);

    socket.on("notify", (data) => {
      setNotification(JSON.parse(data));
    });

    socket.on("start", (data) => {
      console.log(data);
    });
  };

  // fetching Data
  const initData = async () => {
    const { data } = await getTask();
    setData(data);
  };

  // Create Task
  const createTask = async () => {
    try {
      if (!currentData?.name || !currentData?.deadline) return;
      await postTask({
        name: currentData.name,
        deadline: currentData.deadline,
      });
      await initData();
      setModelState(null);
      setCurrentData(null);
    } catch (e) {}
  };
  // Update Task
  const updateTask = async () => {
    try {
      if (!currentData?.name || !currentData?.deadline || !currentData.id)
        return;
      await putTask(
        {
          name: currentData.name,
          deadline: currentData.deadline,
        },
        currentData.id
      );
      await initData();
      setModelState(null);
      setCurrentData(null);
    } catch (e) {}
  };
  // Delete Task
  const removeTask = async (id: number) => {
    try {
      await deleteTask(id);
      await initData();
      setModelState(null);
    } catch (e) {}
  };

  useEffect(() => {
    initData();
    socketHandler();
  }, []);

  return (
    <div className="h-screen w-screen  p-4">
      <div className="mx-auto max-w-7xl grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Task Management</h1>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-transparent hover:bg-slate-200 shadow-xl text-black border relative">
                  <Bell />
                  {notification && (
                    <div className="h-3 w-3 rounded-full bg-red-500 absolute top-0 right-0 -mt-1 -mr-1" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0">
                <DropdownMenuItem>
                  <div>Task : {notification?.name || "No task"}</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    onClick={() => setNotification(null)}
                    variant={"destructive"}
                    size={"sm"}>
                    Clear
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => setModelState("add")}>Add Task</Button>
          </div>
        </div>
        <div className="border rounded-xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Name</TableHead>
                <TableHead>Task DeadLine</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.deadline}</TableCell>
                  <TableCell align="right" className="flex gap-1 items-center">
                    <Button
                      onClick={() => {
                        setModelState("edit");
                        setCurrentData(item);
                      }}
                      size={"sm"}
                      className="bg-yellow-500">
                      Update
                    </Button>
                    <Button
                      size={"sm"}
                      onClick={removeTask.bind(null, item.id)}
                      className="bg-red-500">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <DialogTask
        modelState={modelState}
        setModelState={setModelState}
        currentData={currentData}
        setCurrentData={setCurrentData}
        mutateFunction={modelState === "add" ? createTask : updateTask}
      />
    </div>
  );
};

export default App;
