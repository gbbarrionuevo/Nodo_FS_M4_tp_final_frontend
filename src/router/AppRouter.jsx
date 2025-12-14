import { Route, Routes, Navigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute.jsx';
import PermissionRoute from './PermissionRoute.jsx';
import PrivateLayout from '../layouts/PrivateLayout.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Home from '../pages/Home.jsx';
import Store from '../pages/Store.jsx';
import Inventory from '../pages/Inventory.jsx';
import InventoryDetail from '../pages/InventoryDetail.jsx';
import Purchases from '../pages/Purchases.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import AdministrationLayout from '../layouts/AdministrationLayout.jsx';
import UsersAdmin from '../pages/admin/users/index.jsx';
import UsersAdminCreate from '../pages/admin/users/create.jsx';
import UsersAdminShow from '../pages/admin/users/show.jsx';
import UsersAdminEdit from '../pages/admin/users/edit.jsx';
import RolesAdmin from '../pages/admin/roles/index.jsx';
import RolesAdminCreate from '../pages/admin/roles/create.jsx';
import RolesAdminShow from '../pages/admin/roles/show.jsx';
import RolesAdminEdit from '../pages/admin/roles/edit.jsx';
import PermissionsAdmin from '../pages/admin/permissions/index.jsx';
import PermissionsAdminCreate from '../pages/admin/permissions/create.jsx';
import PermissionsAdminShow from '../pages/admin/permissions/show.jsx';
import PermissionsAdminEdit from '../pages/admin/permissions/edit.jsx';
import CardsAdmin from '../pages/admin/cards/index.jsx';
import CardsAdminShow from '../pages/admin/cards/show.jsx';
import CardsAdminEdit from '../pages/admin/cards/edit.jsx';
import ContactAdmin from '../pages/admin/contact/index.jsx';
import ContactAdminShow from '../pages/admin/contact/show.jsx';
import Detail from '../pages/cart/Detail.jsx';
import Checkout from '../pages/cart/Checkout.jsx';
import Confirmation from '../pages/cart/Confirmation.jsx';
import Profile from '../pages/Profile.jsx';
import NotFound from '../pages/NotFound.jsx';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private */}
      <Route
        path='/home'
        element={<ProtectedRoute><PrivateLayout><Home /></PrivateLayout></ProtectedRoute>}
      />

      <Route
        path='/store'
        element={
          <ProtectedRoute>
            <PermissionRoute perm="read:store">
              <PrivateLayout>
                <Store />
              </PrivateLayout>
            </PermissionRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path='/inventory'
        element={
          <ProtectedRoute>
            <PermissionRoute perm="read:inventory">
              <PrivateLayout>
                <Inventory />
              </PrivateLayout>
            </PermissionRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path='/inventory/:id/detail'
        element={
          <ProtectedRoute>
            <PermissionRoute perm="read:inventory-item-detail">
              <PrivateLayout>
                <InventoryDetail />
              </PrivateLayout>
            </PermissionRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path='/purchases'
        element={
          <ProtectedRoute>
            <PermissionRoute perm="read:purchase">
              <PrivateLayout>
                <Purchases />
              </PrivateLayout>
            </PermissionRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path='/about'
        element={
          <ProtectedRoute>
            <PermissionRoute perm="read:about">
              <PrivateLayout>
                <About />
              </PrivateLayout>
            </PermissionRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path='/contact'
        element={
          <ProtectedRoute>
            <PermissionRoute perm="create:contact">
              <PrivateLayout>
                <Contact />
              </PrivateLayout>
            </PermissionRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/administration"
        element={
          <ProtectedRoute>
            <PermissionRoute perm="read:admin">
              <PrivateLayout>
                <AdministrationLayout />
              </PrivateLayout>
            </PermissionRoute>
          </ProtectedRoute>

        }
      >
        <Route
          path="users"
          element={
            <PermissionRoute perm="read:user">
              <UsersAdmin />
            </PermissionRoute>
          }
        />
        <Route
          path="users/create"
          element={
            <PermissionRoute perm="create:user">
              <UsersAdminCreate />
            </PermissionRoute>
          }
        />
        <Route
          path="users/:id/show"
          element={
            <PermissionRoute perm="read:user">
              <UsersAdminShow />
            </PermissionRoute>
          }
        />
        <Route
          path="users/:id/edit"
          element={
            <PermissionRoute perm="update:user">
              <UsersAdminEdit />
            </PermissionRoute>
          }
        />

        <Route
          path="roles"
          element={
            <PermissionRoute perm="read:role">
              <RolesAdmin />
            </PermissionRoute>
          }
        />
        <Route
          path="roles/create"
          element={
            <PermissionRoute perm="create:role">
              <RolesAdminCreate />
            </PermissionRoute>
          }
        />
        <Route
          path="roles/:id/show"
          element={
            <PermissionRoute perm="read:role">
              <RolesAdminShow />
            </PermissionRoute>
          }
        />
        <Route
          path="roles/:id/edit"
          element={
            <PermissionRoute perm="update:role">
              <RolesAdminEdit />
            </PermissionRoute>
          }
        />

        <Route
          path="permissions"
          element={
            <PermissionRoute perm="read:permission">
              <PermissionsAdmin />
            </PermissionRoute>
          }
        />
        <Route
          path="permissions/create"
          element={
            <PermissionRoute perm="create:permission">
              <PermissionsAdminCreate />
            </PermissionRoute>
          }
        />
        <Route
          path="permissions/:id/show"
          element={
            <PermissionRoute perm="read:permission">
              <PermissionsAdminShow />
            </PermissionRoute>
          }
        />
        <Route
          path="permissions/:id/edit"
          element={
            <PermissionRoute perm="update:permission">
              <PermissionsAdminEdit />
            </PermissionRoute>
          }
        />

        <Route
          path="cards"
          element={
            <PermissionRoute perm="read:card">
              <CardsAdmin />
            </PermissionRoute>
          }
        />
        <Route
          path="cards/:id/show"
          element={
            <PermissionRoute perm="read:card">
              <CardsAdminShow />
            </PermissionRoute>
          }
        />
        <Route
          path="cards/:id/edit"
          element={
            <PermissionRoute perm="update:card">
              <CardsAdminEdit />
            </PermissionRoute>
          }
        />

        <Route
          path="contact"
          element={
            <PermissionRoute perm="read:contact">
              <ContactAdmin />
            </PermissionRoute>
          }
        />
        <Route
          path="contact/:id/show"
          element={
            <PermissionRoute perm="read:contact">
              <ContactAdminShow />
            </PermissionRoute>
          }
        />
      </Route>

      <Route
        path='/cart/detail'
        element={
          <ProtectedRoute>
            <PermissionRoute perm={["read:cart", "create:cart", "update:cart", "delete:cart"]}>
              <PrivateLayout>
                <Detail />
              </PrivateLayout>
            </PermissionRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path='/cart/checkout'
        element={
          <ProtectedRoute>
            <PermissionRoute perm={["read:cart", "create:purchase"]}>
              <PrivateLayout>
                <Checkout />
              </PrivateLayout>
            </PermissionRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path='/cart/confirmation'
        element={
          <ProtectedRoute>
            <PermissionRoute perm="read:cart">
              <PrivateLayout>
                <Confirmation />
              </PrivateLayout>
            </PermissionRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <PermissionRoute perm="read:profile">
              <PrivateLayout>
                <Profile />
              </PrivateLayout>
            </PermissionRoute>
          </ProtectedRoute>
        }
      />

      {/* Not Found */}
      <Route path='/not-found' element={<NotFound />} />
      <Route path='*' element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
}

export default AppRouter;