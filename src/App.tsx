@@ .. @@
 import React, { useState } from 'react';
-import { Header } from './components/Header';
-import { InputForm } from './components/InputForm';
-import { ResultsDisplay } from './components/ResultsDisplay';
-import { analyzeBusinessData } from './services/api';
-import { BusinessInput, BusinessAnalysis } from './types';
import type { BusinessInput, BusinessAnalysis } from './types';
+import { Header } from './components/Header';
+import { InputForm } from './components/InputForm';
+import { ResultsDisplay } from './components/ResultsDisplay';
+import { analyzeBusinessData } from './services/api';
+import { BusinessInput, BusinessAnalysis } from './types';

 function App() {
 }