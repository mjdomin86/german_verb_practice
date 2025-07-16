import React, { useState, useEffect } from 'react';
import { Check, X, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { verbService, practiceService } from '../services/api';
import axios from 'axios';

const VerbPractice = () => {
  const [verbs, setVerbs] = useState([]);
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [selectedPreposition, setSelectedPreposition] = useState('');
  const [selectedMeaning, setSelectedMeaning] = useState('');
  const [selectedCase, setSelectedCase] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newVerb, setNewVerb] = useState({
    verb: '',
    preposition: '',
    meaning: '',
    grammaticalCase: 'AKKUSATIV'
  });
  const [options, setOptions] = useState({ prepositions: [], meanings: [], cases: [] });

  // Predefined options
  const prepositions = ['an', 'auf', 'aus', 'bei', 'für', 'gegen', 'in', 'mit', 'nach', 'über', 'um', 'unter', 'von', 'vor', 'zu'];
  const cases = ['AKKUSATIV', 'DATIV'];
  const meanings = [
    'to think of/about', 'to wait for', 'to be happy about', 'to help with', 'to speak with',
    'to be interested in', 'to belong to', 'to be annoyed about', 'to ask for', 'to take care of',
    'to look for', 'to depend on', 'to be afraid of', 'to dream of', 'to talk about',
    'to complain about', 'to remind of', 'to hope for', 'to prepare for', 'to protect from'
  ];

  // Load verbs on component mount
  useEffect(() => {
    loadVerbs();
  }, []);

  useEffect(() => {
    if (verbs.length > 0) {
      fetchOptions(verbs[currentVerbIndex]?.id);
    }
    // eslint-disable-next-line
  }, [verbs, currentVerbIndex]);

  const loadVerbs = async () => {
    try {
      setLoading(true);
      const response = await verbService.getAllVerbsRandomized();
      setVerbs(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load verbs. Please make sure the backend is running.');
      console.error('Error loading verbs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOptions = async (verbId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/practice/options/${verbId}`);
      setOptions(response.data);
    } catch (err) {
      setOptions({ prepositions: [], meanings: [], cases: [] });
    }
  };

  const currentVerb = verbs[currentVerbIndex];

  const checkAnswer = async () => {
    if (!currentVerb) return;
    
    try {
      setLoading(true);
      const answer = {
        verbId: currentVerb.id,
        selectedPreposition,
        selectedMeaning,
        selectedCase
      };
      
      const response = await practiceService.checkAnswer(answer);
      const result = response.data;
      
      setCurrentResult(result);
      setScore(prev => ({
        correct: prev.correct + (result.correct ? 1 : 0),
        total: prev.total + 1
      }));
      
      setShowResult(true);
      setError('');
    } catch (err) {
      setError('Failed to check answer. Please try again.');
      console.error('Error checking answer:', err);
    } finally {
      setLoading(false);
    }
  };

  const nextVerb = () => {
    setCurrentVerbIndex((prev) => (prev + 1) % verbs.length);
    setSelectedPreposition('');
    setSelectedMeaning('');
    setSelectedCase('');
    setShowResult(false);
    setCurrentResult(null);
  };

  const resetPractice = async () => {
    // Save current session if there are any answers
    if (score.total > 0) {
      try {
        await practiceService.savePracticeSession(score.total, score.correct);
      } catch (err) {
        console.error('Error saving practice session:', err);
      }
    }
    
    setCurrentVerbIndex(0);
    setSelectedPreposition('');
    setSelectedMeaning('');
    setSelectedCase('');
    setShowResult(false);
    setCurrentResult(null);
    setScore({ correct: 0, total: 0 });
    await loadVerbs(); // Reload and shuffle verbs
  };

  const addNewVerb = async () => {
    if (!newVerb.verb || !newVerb.preposition || !newVerb.meaning) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      await verbService.createVerb(newVerb);
      setNewVerb({
        verb: '',
        preposition: '',
        meaning: '',
        grammaticalCase: 'AKKUSATIV'
      });
      setShowAddForm(false);
      await loadVerbs();
      setError('');
    } catch (err) {
      setError('Failed to add verb. It might already exist.');
      console.error('Error adding verb:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeVerb = async (id) => {
    try {
      setLoading(true);
      await verbService.deleteVerb(id);
      await loadVerbs();
      if (currentVerbIndex >= verbs.length - 1) {
        setCurrentVerbIndex(0);
      }
      setError('');
    } catch (err) {
      setError('Failed to remove verb.');
      console.error('Error removing verb:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && verbs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading verbs...</p>
        </div>
      </div>
    );
  }

  if (verbs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No verbs available. Please add some verbs to practice.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Verb
          </button>
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Add New Verb</h2>
                <input
                  type="text"
                  placeholder="Verb (e.g., denken)"
                  value={newVerb.verb}
                  onChange={(e) => setNewVerb({...newVerb, verb: e.target.value})}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Preposition (e.g., an)"
                  value={newVerb.preposition}
                  onChange={(e) => setNewVerb({...newVerb, preposition: e.target.value})}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Meaning (e.g., to think of)"
                  value={newVerb.meaning}
                  onChange={(e) => setNewVerb({...newVerb, meaning: e.target.value})}
                  className="w-full p-2 border rounded mb-2"
                />
                <select
                  value={newVerb.grammaticalCase}
                  onChange={(e) => setNewVerb({...newVerb, grammaticalCase: e.target.value})}
                  className="w-full p-2 border rounded mb-4"
                >
                  <option value="AKKUSATIV">Akkusativ</option>
                  <option value="DATIV">Dativ</option>
                </select>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addNewVerb}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Verb
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const isAnswerComplete = selectedPreposition && selectedMeaning && selectedCase;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">German Verb Practice</h1>
          <p className="text-gray-600">Practice German verbs with prepositions, meanings, and cases</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Score Display */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-700">
              Score: {score.correct}/{score.total}
              {score.total > 0 && (
                <span className="text-sm text-gray-500 ml-2">
                  ({Math.round((score.correct / score.total) * 100)}%)
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={resetPractice}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Add New Verb Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Add New Verb</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Verb</label>
                <input
                  type="text"
                  value={newVerb.verb}
                  onChange={(e) => setNewVerb({...newVerb, verb: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., denken"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preposition</label>
                <select
                  value={newVerb.preposition}
                  onChange={(e) => setNewVerb({...newVerb, preposition: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select preposition</option>
                  {prepositions.map(prep => (
                    <option key={prep} value={prep}>{prep}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meaning</label>
                <input
                  type="text"
                  value={newVerb.meaning}
                  onChange={(e) => setNewVerb({...newVerb, meaning: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., to think of/about"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Case</label>
                <select
                  value={newVerb.grammaticalCase}
                  onChange={(e) => setNewVerb({...newVerb, grammaticalCase: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {cases.map(case_option => (
                    <option key={case_option} value={case_option}>{case_option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={addNewVerb}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Verb'}
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Main Practice Area */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {currentVerb.verb}
            </h2>
            <p className="text-gray-600">
              Question {currentVerbIndex + 1} of {verbs.length}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Preposition Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Preposition
              </label>
              <div className="flex flex-wrap gap-2">
                {options.prepositions.map((prep) => (
                  <button
                    key={prep}
                    onClick={() => setSelectedPreposition(prep)}
                    disabled={showResult}
                    className={`px-3 py-2 rounded-lg border ${selectedPreposition === prep ? 'bg-blue-500 text-white' : 'bg-white text-blue-700'} ${showResult && currentResult && currentResult.correctAnswer.preposition === prep ? (currentResult.prepositionCorrect ? 'border-green-500' : 'border-red-500') : 'border-gray-300'}`}
                  >
                    {prep}
                  </button>
                ))}
              </div>
              {showResult && currentResult && (
                <div className="mt-2 flex items-center">
                  {currentResult.prepositionCorrect ? (
                    <Check className="text-green-500 w-4 h-4 mr-1" />
                  ) : (
                    <X className="text-red-500 w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm text-gray-600">
                    Correct: {currentResult.correctAnswer.preposition}
                  </span>
                </div>
              )}
            </div>

            {/* Meaning Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Meaning
              </label>
              <div className="flex flex-wrap gap-2">
                {options.meanings.map((meaning) => (
                  <button
                    key={meaning}
                    onClick={() => setSelectedMeaning(meaning)}
                    disabled={showResult}
                    className={`px-3 py-2 rounded-lg border ${selectedMeaning === meaning ? 'bg-blue-500 text-white' : 'bg-white text-blue-700'} ${showResult && currentResult && currentResult.correctAnswer.meaning === meaning ? (currentResult.meaningCorrect ? 'border-green-500' : 'border-red-500') : 'border-gray-300'}`}
                  >
                    {meaning}
                  </button>
                ))}
              </div>
              {showResult && currentResult && (
                <div className="mt-2 flex items-center">
                  {currentResult.meaningCorrect ? (
                    <Check className="text-green-500 w-4 h-4 mr-1" />
                  ) : (
                    <X className="text-red-500 w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm text-gray-600">
                    Correct: {currentResult.correctAnswer.meaning}
                  </span>
                </div>
              )}
            </div>

            {/* Case Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Case
              </label>
              <div className="flex flex-wrap gap-2">
                {options.cases.map((case_option) => (
                  <button
                    key={case_option}
                    onClick={() => setSelectedCase(case_option)}
                    disabled={showResult}
                    className={`px-3 py-2 rounded-lg border ${selectedCase === case_option ? 'bg-blue-500 text-white' : 'bg-white text-blue-700'} ${showResult && currentResult && currentResult.correctAnswer.grammaticalCase === case_option ? (currentResult.caseCorrect ? 'border-green-500' : 'border-red-500') : 'border-gray-300'}`}
                  >
                    {case_option}
                  </button>
                ))}
              </div>
              {showResult && currentResult && (
                <div className="mt-2 flex items-center">
                  {currentResult.caseCorrect ? (
                    <Check className="text-green-500 w-4 h-4 mr-1" />
                  ) : (
                    <X className="text-red-500 w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm text-gray-600">
                    Correct: {currentResult.correctAnswer.grammaticalCase}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            {!showResult ? (
              <button
                onClick={checkAnswer}
                disabled={!isAnswerComplete || loading}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Checking...' : 'Check Answer'}
              </button>
            ) : (
              <div className="text-center">
                <div className={`text-2xl font-bold mb-4 ${currentResult?.correct ? 'text-green-600' : 'text-red-600'}`}>
                  {currentResult?.correct ? '✓ Correct!' : '✗ Incorrect'}
                </div>
                <button
                  onClick={nextVerb}
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Next Verb
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerbPractice;