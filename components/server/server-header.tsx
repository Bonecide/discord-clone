'use client';

import {ServerWithMembersWithProfiles} from '@/types';
import {MemberRole} from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  ChevronDown,
  DoorOpen,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react';
import {useModal} from '@/hooks/use-modal-store';
import {useState} from 'react';

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}
export const ServerHeader = ({server, role}: ServerHeaderProps) => {
  const {onOpen} = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu onOpenChange={() => setIsOpen(!isOpen)}>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 h-[40px] flex items-center  border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown
            className={`h-5 w-5 ml-auto ${
              isOpen && 'rotate-180'
            } transition-[0.3s]  `}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen('invite', {server})}
            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer focus:bg-indigo-400 focus:!text-white transition">
            Пригласить людей
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('editServer', {server})}
            className="px-3 py-2 text-sm cursor-pointer focus:bg-indigo-400 focus:text-white transition">
            Настройки сервера
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer focus:bg-indigo-400 focus:text-white transition">
            Управление людьми
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer focus:bg-indigo-400 focus:text-white transition">
            Создать канал
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer focus:bg-rose-600 hover:!text-white transition">
            Удалить сервер
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer focus:bg-rose-600 hover:!text-white transition">
            Покинуть сервер
            <DoorOpen className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
