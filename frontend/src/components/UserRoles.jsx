import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Security as SecurityIcon,
} from '@mui/icons-material'

const roles = [
  {
    id: 1,
    name: 'Admin',
    permissions: ['manage_users', 'manage_content', 'manage_roles', 'manage_settings'],
    description: 'Full access to all features and settings',
  },
  {
    id: 2,
    name: 'Editor',
    permissions: ['manage_content', 'review_content', 'publish_content'],
    description: 'Can manage and publish content',
  },
  {
    id: 3,
    name: 'Author',
    permissions: ['create_content', 'edit_own_content'],
    description: 'Can create and edit their own content',
  },
  {
    id: 4,
    name: 'Subscriber',
    permissions: ['read_content', 'comment'],
    description: 'Can read content and comment',
  },
]

const permissions = [
  { id: 'manage_users', label: 'Manage Users' },
  { id: 'manage_content', label: 'Manage Content' },
  { id: 'manage_roles', label: 'Manage Roles' },
  { id: 'manage_settings', label: 'Manage Settings' },
  { id: 'review_content', label: 'Review Content' },
  { id: 'publish_content', label: 'Publish Content' },
  { id: 'create_content', label: 'Create Content' },
  { id: 'edit_own_content', label: 'Edit Own Content' },
  { id: 'read_content', label: 'Read Content' },
  { id: 'comment', label: 'Comment' },
]

function UserRoles() {
  const [open, setOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [roleName, setRoleName] = useState('')
  const [roleDescription, setRoleDescription] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState([])

  const handleOpen = (role = null) => {
    if (role) {
      setSelectedRole(role)
      setRoleName(role.name)
      setRoleDescription(role.description)
      setSelectedPermissions(role.permissions)
    } else {
      setSelectedRole(null)
      setRoleName('')
      setRoleDescription('')
      setSelectedPermissions([])
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedRole(null)
    setRoleName('')
    setRoleDescription('')
    setSelectedPermissions([])
  }

  const handleSave = () => {
    // TODO: Implement role saving logic
    console.log('Saving role:', {
      name: roleName,
      description: roleDescription,
      permissions: selectedPermissions,
    })
    handleClose()
  }

  const handleDelete = (roleId) => {
    // TODO: Implement role deletion logic
    console.log('Deleting role:', roleId)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          User Roles & Permissions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Role
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SecurityIcon sx={{ mr: 1 }} />
                    {role.name}
                  </Box>
                </TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {role.permissions.map((permission) => (
                      <Chip
                        key={permission}
                        label={permissions.find((p) => p.id === permission)?.label}
                        size="small"
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit Role">
                    <IconButton onClick={() => handleOpen(role)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Role">
                    <IconButton onClick={() => handleDelete(role.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedRole ? 'Edit Role' : 'Add New Role'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Role Name"
              fullWidth
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={2}
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Permissions</InputLabel>
              <Select
                multiple
                value={selectedPermissions}
                onChange={(e) => setSelectedPermissions(e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={permissions.find((p) => p.id === value)?.label}
                        size="small"
                      />
                    ))}
                  </Box>
                )}
              >
                {permissions.map((permission) => (
                  <MenuItem key={permission.id} value={permission.id}>
                    {permission.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default UserRoles 