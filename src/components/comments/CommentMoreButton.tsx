import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import DeleteCommentDialog from "./DeleteCommentDialog";
import { CommentData } from "@/lib/types";

interface CommentMoreButtonProps {
  comment: CommentData;
  className?: string;
}

export default function CommentMoreButton({
  comment,
  className,
}: CommentMoreButtonProps) {
  const [showCommentDialog, setShowCommentDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className={className}>
            <MoreHorizontal className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowCommentDialog(true)}>
            <span className="flex cursor-pointer items-center gap-3 text-destructive">
              <Trash2 className="size-4" /> Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteCommentDialog
        comment={comment}
        open={showCommentDialog}
        onClose={() => setShowCommentDialog(false)}
      />
    </>
  );
}
