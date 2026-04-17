# Firebase Progress Sync - Debug Guide

## Problem
Progress data (XP, quiz scores, etc.) is not being saved to Firebase Realtime Database when students use the app on different devices.

## Changes Made

### 1. Enhanced Logging
Added comprehensive console.log statements to track the flow:
- `AppContext.tsx`: Logs when `updateProgress`, `persistProgress` are called
- `database.ts`: Logs when `saveProgress` is called and completed
- All logs are prefixed with `[AppContext]` or `[Firebase]` for easy filtering

### 2. Error Handling
- Added try-catch blocks to `saveProgress` function
- Added error handling to `persistProgress` with user-visible alerts
- Errors will now show in console AND as browser alerts

### 3. Database Cleanup
- Removed extra teacher accounts (hoca, yeliz)
- Only `test/test` teacher account remains
- Cleaned up test data

### 4. Debug Panel
Added a floating debug panel on the Dashboard (bottom-right corner) that allows:
- **Test Write**: Manually trigger a Firebase write with current progress
- **Test Read**: Read progress data from Firebase
- Shows current user and XP
- Displays success/error messages

## How to Test

### Step 1: Open Browser Console
1. Open the app in your browser
2. Press F12 to open Developer Tools
3. Go to the "Console" tab
4. Clear the console (click the 🚫 icon)

### Step 2: Login as Student
1. Login with username: `aga` (or create a new student)
2. Watch the console for logs like:
   ```
   [AppContext] Setting up progress listener for: aga
   [AppContext] Progress changed from Firebase: undefined
   [AppContext] No progress found, creating default
   [AppContext] Saving default progress to Firebase
   [Firebase] saveProgress called: aga 0
   [Firebase] Writing to path: progress/aga
   [Firebase] saveProgress completed successfully
   ```

### Step 3: Earn Some XP
1. Go to Quiz page and complete a quiz
2. Watch console for:
   ```
   [AppContext] updateProgress called
   [AppContext] Progress updated, calling persistProgress
   [AppContext] persistProgress called: {username: "aga", role: "ogrenci", xp: 100}
   [AppContext] Calling saveProgress after debounce
   [Firebase] saveProgress called: aga 100
   [Firebase] saveProgress completed successfully
   ```

### Step 4: Use Debug Panel
1. Look at bottom-right corner of Dashboard
2. Click "Test Write" button
3. Should see "✅ Write successful!"
4. Click "Test Read" button
5. Should see "✅ Read successful! XP: [your XP]"

### Step 5: Verify in Firebase Console
1. Go to: https://console.firebase.google.com/
2. Select project: edebiat-470ce
3. Go to Realtime Database
4. Check if `progress/[username]` node exists
5. Verify XP value matches

### Step 6: Test Cross-Device Sync
1. Login on Device 1, earn some XP
2. Check console logs to confirm save
3. Login on Device 2 with same username
4. XP should load from Firebase

## Common Issues

### Issue: No console logs appear
**Solution**: Make sure you're looking at the Console tab in Developer Tools (F12)

### Issue: "Write failed: Permission denied"
**Solution**: Check Firebase Realtime Database Rules - should be in test mode:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### Issue: Logs show "Skipping save - no username or teacher role"
**Solution**: You're logged in as teacher. Login as a student instead.

### Issue: Progress saves but doesn't load on other device
**Solution**: Check if the realtime listener is working. Look for:
```
[AppContext] Progress changed from Firebase: [XP value]
```

## Scripts Available

Run these from the `New folder (5)` directory:

```bash
# Check all database contents
node check_all_db.cjs

# Test write capability
node test_write.cjs

# Cleanup database (removes test data)
node cleanup_db.cjs
```

## Next Steps

If the debug panel shows successful writes but data still doesn't persist:
1. Check browser console for any errors
2. Verify Firebase project ID matches in config
3. Check network tab in DevTools for failed requests
4. Ensure Firebase SDK is properly loaded (check for 404 errors)

## Contact

If issues persist after following this guide, provide:
1. Screenshot of browser console logs
2. Screenshot of debug panel results
3. Screenshot of Firebase Realtime Database structure
