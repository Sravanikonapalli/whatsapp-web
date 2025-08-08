
## Problems and Solutions

1. **Duplicate names in sidebar**
  - **Solution:** Ensure each contact/user in the sidebar has a unique identifier and filter out duplicates before rendering.
  
  //duplicates by user ID
  const uniqueContacts = contacts.filter(
    (contact, index, self) =>
     index === self.findIndex((c) => c.id === contact.id)
  );


2. **Same conversation shown on selecting different names**
  - **Solution:** Link each conversation to a unique user ID and fetch/display messages based on the selected user's ID.
  ```js
  // Fetch messages for selected user
  function handleSelectUser(userId) {
    const conversation = conversations.find(conv => conv.userId === userId);
    setCurrentConversation(conversation);
  }
  ```

3. **No delete option after sending message**
  - **Solution:** Add a delete button in the frontend UI for each message.
  ```
  // Add delete button in message component
  {messages.map(msg => (
    <div key={msg.id}>
     <span>{msg.text}</span>
     <button onClick={() => handleDelete(msg.id)}>Delete</button>
    </div>
  ))}
  ```

4. **Delete button not working**
  - **Solution:** Change `wa_.id` to `_.id` in your delete logic to correctly target and delete the specific message.
  ```js
  // Correct delete logic
  function handleDelete(id) {
    setMessages(messages.filter(_ => _.id !== id));
  }
  ```
```