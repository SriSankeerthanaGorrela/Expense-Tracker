"use client"
import React, { useState } from 'react'
import Dialog from '../components/Dialog'
import SettingsPage from './FormEdit'

function page() {
    const[isEditing,setIsEditing]=useState(false)
  return (
      <div>
          <h3>Settings</h3>
          <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
          {isEditing && (
              <Dialog open={isEditing} onClose={() => setIsEditing(false)} size="lg">
                  <SettingsPage />
                    </Dialog>
          )}
      </div>
  )
}

export default page