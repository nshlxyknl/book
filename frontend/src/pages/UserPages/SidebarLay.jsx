import { Home, Package, ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const menuItems = [
  { title: "Products", icon: Package, path: "/dashboard" },
  { title: "Orders", icon: ShoppingCart, path: "/dashboard/orders" },
]

export function SidebarLay({ onNavigate }) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r p-4">
      <h2 className="text-xl font-bold mb-6">My Bar</h2>

      <nav className="space-y-2">
        {menuItems.map(({ title, icon: Icon, path }) => (
          <Button
            key={title}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              navigate(path)
              onNavigate?.() // closes sidebar when navigating
            }}
          >
            <Icon className="w-4 h-4 mr-2" />
            {title}
          </Button>
        ))}
      </nav>
    </div>
  )
}
