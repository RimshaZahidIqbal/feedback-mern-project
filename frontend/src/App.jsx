import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Login from './pages/Auth/Login.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import ManageFeedback from './pages/Admin/ManageFeedback.jsx';
import Feedback from './pages/User/Feedback.jsx';
import ThankYou from './pages/User/ThankYou.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import UserProvider from './context/userContext.jsx';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Feedback />} />
          <Route path='/login' element={<Login />} />
          <Route path='/thankyou' element={<ThankYou />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/tasks' element={<ManageFeedback />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </UserProvider>
  );
}

export default App;
