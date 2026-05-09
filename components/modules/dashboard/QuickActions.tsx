import React from "react";
import Link from "next/link";
import { Button } from "../../ui/button";

interface QuickAction {
  title: string;
  desc?: string;
  href: string;
  icon: React.ElementType;
  gradient: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => (
  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
    {actions.map((action) => (
      <Link key={action.title} href={action.href} className="w-full">
        <Button className={`w-full bg-gradient-to-r ${action.gradient} text-white shadow-md hover:opacity-90`}>
          <action.icon className="mr-2 size-4" />
          {action.title}
        </Button>
      </Link>
    ))}
  </div>
);
