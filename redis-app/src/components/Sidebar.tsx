import { USERS } from '@/db/dummy';
import React from 'react'
import { ScrollArea } from './ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider } from './ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
    isCollapsed: boolean;
}

const Sidebar = ({isCollapsed}: SidebarProps) => {

    const selectedUser = USERS[0];

  return (
    <div className='relative flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 max-h-full overflow-auto bg-background'>
        {!isCollapsed && (
				<div className='flex justify-between p-2 items-center'>
					<div className='flex gap-2 items-center text-2xl'>
						<p className='font-medium'>Chats</p>
					</div>
				</div>
			)}

        <ScrollArea className='gap-2 px-2 roup-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
            {USERS.map((user, idx) => (
                isCollapsed ? (
                    <TooltipProvider key={idx}>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <div>
                                    <Avatar className='my-1 flex justify-center items-center'>
                                        <AvatarImage 
                                            src={user.image || "/user-placeholder.png"}
                                            alt='User image'
                                            width={6}
                                            height={6}
                                            className='border-2 border-white rounded-full w-10 h-10'
                                        />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>

                                    <span className='sr-only'>{user.name}</span>
                                </div>
                            </TooltipTrigger>

                            <TooltipContent
                                side="right"
                                className='flex items-center gap-4'
                            >
                                {user.name}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    <Button key={idx} 
                        variant={"grey"}
                        size={"xl"}
                        className={cn("w-full justify-start gap-4 my-1", 
                            selectedUser.email === user.email && 
                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink"
                        )}
                    >
                        <Avatar className='my-1 flex justify-center items-center'>
                            <AvatarImage 
                                src={user.image || "/user-placeholder.png"}
                                alt={'User image'}
                                referrerPolicy='no-referrer'
                                className=' w-10 h-10'
                            />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>

                        <div className='flex flex-col max-w-28'>
                            <span>{user.name}</span>
                        </div>
                    </Button>
                )
            ))}
        </ScrollArea>
    </div>
  )
}

export default Sidebar