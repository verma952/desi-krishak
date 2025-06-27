// For now, simple dummy chat logic

exports.chatHandler = (req, res) => {
    const { message } = req.body;
  
    // Simple predefined responses for testing
    const lowerMsg = message.toLowerCase();
  
    if (lowerMsg.includes('hello')) {
      return res.json({ response: "Hello! How can I help you with Desi Krishak today?" });
    }
    if (lowerMsg.includes('milk')) {
      return res.json({ response: "You can buy milk from dairy product sellers on Desi Krishak." });
    }
  
    res.json({ response: "Sorry, I didn't understand that." });
  };
  