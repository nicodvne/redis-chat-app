'use client'

import React, { useEffect, useState } from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { cn } from '@/lib/utils';
import Sidebar from '../Sidebar';
import MessageContainer from './MessageContainer';
  

interface ChatLayoutProps {
    defaultLayout: number[] | undefined;
}

function ChatLayout({defaultLayout = [320, 480]}: ChatLayoutProps) {

    const [isMobile, setIsMobile] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        // check screen width method declaration
        const checkScreenWidth = () => {
            setIsMobile(window.innerWidth <= 768);
        }

        // initial call
        checkScreenWidth()

        // Event listener for window width change 
        window.addEventListener('resize', checkScreenWidth);

        // cleanup listener on component unmount
        return () => {
            window.removeEventListener('resize', checkScreenWidth);
        }
    }, [])

  return (
    <ResizablePanelGroup
        direction='horizontal'
        className='h-full items-stretch bg-background rounded-lg'
        // onLayout is called every time the rezisablepanel is update
        onLayout={(sizes:number[]) => {
            document.cookie = `react-rezisable-panels:layout=${JSON.stringify(sizes)}`
        }}
    >
        <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={8}
            collapsible={true}
            minSize={isMobile ? 0 : 24}
            maxSize={isMobile ? 8 : 30}
            onCollapse={() => {
                setIsCollapsed(true);
                document.cookie = `react-rezisable-panels:collapsed=true`
            }}
            onExpand={() => {
                setIsCollapsed(false);
                document.cookie = `react-rezisable-panels:collapsed=false`
            }}
            className={cn(isCollapsed && 'min-w-[80px] transition-all duration-300 ease-in-out')}
        >
            <Sidebar isCollapsed={isCollapsed}/>
        </ResizablePanel>
        <ResizableHandle withHandle></ResizableHandle>
        <ResizablePanel
            defaultSize={defaultLayout[1]} minSize={30}
        >
            <div className='flex justify-center items-center h-full w-full px-10'>
                {/*<div className='flex flex-col justify-center items-center gap-4'>
                    <img src='/logo.png' alt='Logo' className='w-full md:w-2/3 lg:w-1/2' />
                    <p className='text-muted-foreground text-center'>Click on a chat to view the messages</p>
                </div>*/}
                <MessageContainer/>
            </div>
        </ResizablePanel>

    </ResizablePanelGroup>
  )
}

export default ChatLayout