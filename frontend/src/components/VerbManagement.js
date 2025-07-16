import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { verbService } from '../services/api';

const VerbManagement = () => {
  const [verbs, setVerbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadVerbs();
  }, []);

  const loadVerbs = async () => {
    try {
      setLoading(true);
      const response = await verbService.getAllVerbs();
      setVerbs(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load verbs.');
    } finally {
      setLoading(false);
    }
  };

  const removeVerb = async (id) => {
    try {
      setLoading(true);
      await verbService.deleteVerb(id);
      await loadVerbs();
      setError('');
    } catch (err) {
      setError('Failed to remove verb.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Current Verbs ({verbs.length})</h3>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {verbs.map((verb) => (
          <div key={verb.id} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => removeVerb(verb.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              disabled={loading}
            >
              <Trash2 size={16} />
            </button>
            <div className="font-semibold text-lg">{verb.verb}</div>
            <div className="text-gray-600">+ {verb.preposition}</div>
            <div className="text-gray-600">{verb.meaning}</div>
            <div className="text-sm text-gray-500">{verb.grammaticalCase}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerbManagement;
