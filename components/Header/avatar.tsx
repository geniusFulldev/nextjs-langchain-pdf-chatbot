'use client'

import React, {Fragment} from 'react';
import { useSession } from 'next-auth/react';
import { Menu, Transition  } from '@headlessui/react'
import classnames from 'classnames';
import { signOut } from 'next-auth/react';

const Avatar = () => {
    const {data: session, status} = useSession();
    const onSignOut = () => {
        console.log('signout');
        signOut();
    }

    return status ==="authenticated"?  (
        <div className="relative text-right">
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button>
                    <div className="flex items-center space-x-4 cursor-pointer">
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 flex items-center space-x-4">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>        
                        <div className="text-left font-medium">
                            <div>{session.user.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{session.user.email}</div>                                    
                        </div>
                    </div>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >                
                    <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg-white focus:outline-none dark:bg-gray-700 dark:divide-gray-600">
                        <div className="px-1 py-1 ">
                          <Menu.Item >
                          {({ active }) => {
                            console.log('active =>', active);
                            return (
                                <button className={classnames("group flex w-full items-center rounded-md px-2 py-2 text-sm", {
                                    "bg-gray-100 dark:bg-gray-800 ": active
                                    })} 
                                    onClick={onSignOut}
                                >
                                    Sign Out
                                </button>
                              )
                          }}
                            
                          </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>

        </div>
        ): (
        <></>
    );

}

export default Avatar;