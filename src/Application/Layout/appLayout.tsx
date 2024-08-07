import React from "react"
import { Outlet } from "react-router"

export const AppLayout : React.FC = () => {
  return (
    <div className="min-h-screen h-full">
      <header>
        <div className="flex justify-center">
          <img className="mt-20" src="src\Infrastructure\Images\logo.svg" alt="logo" />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}