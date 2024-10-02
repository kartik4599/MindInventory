import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

interface DialogTaskProps {
  modelState: "add" | "edit" | null;
  setModelState: React.Dispatch<React.SetStateAction<"add" | "edit" | null>>;
  currentData: {
    name: string;
    deadline: string;
  } | null;
  setCurrentData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      deadline: string;
    } | null>
  >;
  mutateFunction: () => void;
}

const DialogTask = ({
  currentData,
  modelState,
  setCurrentData,
  setModelState,
  mutateFunction,
}: DialogTaskProps) => {
  return (
    <Dialog open={Boolean(modelState)} onOpenChange={() => setModelState(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">{modelState} Task</DialogTitle>
          <DialogDescription className="capitalize">
            {modelState} a Task with deadline
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Label>Name</Label>
            <Input
              placeholder="Task Name"
              value={currentData?.name}
              onChange={({ target: { value } }) => {
                setCurrentData((pre) => ({ ...pre, name: value }));
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label>Deadline</Label>
            <Input
              type="datetime-local"
              placeholder="Deadline"
              value={currentData?.deadline}
              onChange={({ target: { value } }) => {
                setCurrentData((pre) => ({ ...pre, deadline: value }));
              }}
            />
          </div>
          <Button onClick={mutateFunction}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTask;
