"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import * as React from "react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  hideCloseButton?: boolean;
  className?: string;
  contentClassName?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "outline";
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  hideCloseButton = false,
  className,
  contentClassName,
  size = "md",
  onConfirm,
  confirmText = "Сохранить",
  cancelText = "Отмена",
  variant = "default",
}: ModalProps) {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[95vw] max-h-[95vh]",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("p-6", sizeClasses[size], "gap-6", contentClassName)}
        onInteractOutside={(e) => {
          // можно запретить закрытие по клику вне окна при необходимости
          // e.preventDefault()
        }}
      >
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <div className={cn("py-2", className)}>{children}</div>

        {footer !== undefined ? (
          footer
        ) : onConfirm || cancelText ? (
          <DialogFooter>
            {cancelText && (
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {cancelText}
              </Button>
            )}
            {onConfirm && (
              <Button variant={variant} onClick={onConfirm}>
                {confirmText}
              </Button>
            )}
          </DialogFooter>
        ) : null}

        {!hideCloseButton && !footer && !onConfirm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={() => onOpenChange(false)}
          >
            ×
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
