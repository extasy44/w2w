'use client';

import { Button, Card, Text, TextArea, TextField, Select } from '@radix-ui/themes';
import { useState } from 'react';
import { useCompletion } from 'ai/react';

interface TestCase {
  id: string;
  name: string;
  type: string;
  description: string;
  expectedResult: string;
  status: 'pending' | 'passed' | 'failed';
}

const TEST_TYPES = ['Functional', 'UI/UX', 'Performance', 'Security', 'Integration', 'User Acceptance'] as const;

export function TestingTools() {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [currentTest, setCurrentTest] = useState<Partial<TestCase>>({});

  const { complete, completion } = useCompletion({
    api: '/api/completion',
  });

  const handleTestTypeSelect = async (type: string) => {
    setCurrentTest((prev) => ({ ...prev, type }));
    await complete(`Suggest test scenarios and expected results for ${type} testing in a no-code environment.`);
  };

  const handleAddTest = () => {
    if (!currentTest.type || !currentTest.name || !currentTest.description || !currentTest.expectedResult) return;

    const newTest: TestCase = {
      id: Date.now().toString(),
      name: currentTest.name,
      type: currentTest.type,
      description: currentTest.description,
      expectedResult: currentTest.expectedResult,
      status: 'pending',
    };

    setTestCases((prev) => [...prev, newTest]);
    setCurrentTest({});
  };

  const handleUpdateStatus = (id: string, status: TestCase['status']) => {
    setTestCases((prev) => prev.map((test) => (test.id === id ? { ...test, status } : test)));
  };

  return (
    <Card className='p-6'>
      <div className='space-y-6'>
        <div>
          <Text size='5' weight='bold'>
            Testing Tools
          </Text>
          <Text color='gray'>Create and manage test cases for your application.</Text>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Test Type
            </Text>
            <Select.Root value={currentTest.type} onValueChange={handleTestTypeSelect}>
              <Select.Trigger className='w-full' />
              <Select.Content>
                {TEST_TYPES.map((type) => (
                  <Select.Item key={type} value={type}>
                    {type}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>

          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Test Name
            </Text>
            <TextField.Root>
              <TextField.Input
                placeholder='Enter test name...'
                value={currentTest.name || ''}
                onChange={(e) => setCurrentTest((prev) => ({ ...prev, name: e.target.value }))}
              />
            </TextField.Root>
          </div>

          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Description
            </Text>
            <TextArea
              placeholder='Describe the test scenario...'
              value={currentTest.description || ''}
              onChange={(e) => setCurrentTest((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>

          {completion && (
            <div className='space-y-2'>
              <Text weight='bold'>AI Suggestions</Text>
              <Card className='p-4 bg-muted'>
                <Text>{completion}</Text>
              </Card>
            </div>
          )}

          <div className='space-y-2'>
            <Text as='label' size='2' weight='bold'>
              Expected Result
            </Text>
            <TextArea
              placeholder='Define expected outcome...'
              value={currentTest.expectedResult || ''}
              onChange={(e) => setCurrentTest((prev) => ({ ...prev, expectedResult: e.target.value }))}
            />
          </div>

          <Button onClick={handleAddTest}>Add Test Case</Button>
        </div>

        {testCases.length > 0 && (
          <div className='space-y-4'>
            <Text weight='bold'>Test Cases</Text>
            <div className='space-y-3'>
              {testCases.map((test) => (
                <Card key={test.id} className='p-4'>
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                      <Text weight='bold'>{test.name}</Text>
                      <div className='space-x-2'>
                        <Button
                          size='1'
                          variant={test.status === 'passed' ? 'solid' : 'outline'}
                          color='green'
                          onClick={() => handleUpdateStatus(test.id, 'passed')}>
                          Pass
                        </Button>
                        <Button
                          size='1'
                          variant={test.status === 'failed' ? 'solid' : 'outline'}
                          color='red'
                          onClick={() => handleUpdateStatus(test.id, 'failed')}>
                          Fail
                        </Button>
                      </div>
                    </div>
                    <Text color='gray'>Type: {test.type}</Text>
                    <Text size='2'>{test.description}</Text>
                    <Text size='2' weight='bold'>
                      Expected Result:
                    </Text>
                    <Text size='2' color='gray'>
                      {test.expectedResult}
                    </Text>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
