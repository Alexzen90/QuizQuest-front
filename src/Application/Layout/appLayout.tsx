import React from "react"
import { Outlet } from "react-router"

export const AppLayout : React.FC = () => {
  return (
    <div className="min-h-screen h-full mt-14">
      <header>
        <div className="flex justify-center">
          <img className="" src="src\Infrastructure\Images\logo.svg" alt="logo" />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}