import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface DatabaseTypeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue: string;
  onSave: (databaseType: string) => void;
}

const DatabaseTypeModal = ({
  open,
  onOpenChange,
  initialValue,
  onSave,
}: DatabaseTypeModalProps) => {
  const [selectedType, setSelectedType] = useState(initialValue);

  const handleSubmit = () => {
    onSave(selectedType);
    onOpenChange(false);
  };

  const databaseOptions = [
    { value: "MySQL", label: "MySQL" },
    { value: "PostgreSQL", label: "PostgreSQL" },
    { value: "SQLite", label: "SQLite" },
    { value: "Oracle", label: "Oracle" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Project Database</DialogTitle>
          <DialogDescription>
            Select the database system you want to generate SQL for. You can
            change this later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="database-type">Database Type</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="database-type">
                <SelectValue placeholder="Select database type" />
              </SelectTrigger>
              <SelectContent>
                {databaseOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DatabaseTypeModal;
