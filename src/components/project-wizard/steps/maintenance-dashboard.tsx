'use client';

import { Button, Card, Text, TextArea, TextField, Select } from '@radix-ui/themes';
import { useState } from 'react';
import { useCompletion } from 'ai/react';
import { MarkdownContent } from '@/components/ui/markdown-content';

interface Metric {
  id: string;
  name: string;
  type: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
  lastUpdated: string;
}

interface Feedback {
  id: string;
  type: string;
  content: string;
  status: 'new' | 'in-progress' | 'resolved';
  createdAt: string;
}

const METRIC_TYPES = ['Performance', 'Error Rate', 'User Activity', 'Resource Usage', 'Response Time', 'Uptime'] as const;

const FEEDBACK_TYPES = ['Bug Report', 'Feature Request', 'User Experience', 'Performance Issue', 'Other'] as const;

export function MaintenanceDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [currentMetric, setCurrentMetric] = useState<Partial<Metric>>({});
  const [currentFeedback, setCurrentFeedback] = useState<Partial<Feedback>>({});

  const { complete, completion } = useCompletion({
    api: '/api/completion',
  });

  const handleAddMetric = () => {
    if (!currentMetric.name || !currentMetric.type || !currentMetric.value) return;

    const newMetric: Metric = {
      id: Date.now().toString(),
      name: currentMetric.name,
      type: currentMetric.type,
      value: currentMetric.value,
      status: 'healthy',
      lastUpdated: new Date().toISOString(),
    };

    setMetrics((prev) => [...prev, newMetric]);
    setCurrentMetric({});
  };

  const handleAddFeedback = async () => {
    if (!currentFeedback.type || !currentFeedback.content) return;

    const newFeedback: Feedback = {
      id: Date.now().toString(),
      type: currentFeedback.type,
      content: currentFeedback.content,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    setFeedback((prev) => [...prev, newFeedback]);
    setCurrentFeedback({});

    await complete(`Analyze this feedback and suggest actions: ${currentFeedback.content}`);
  };

  const handleUpdateFeedbackStatus = (id: string, status: Feedback['status']) => {
    setFeedback((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  return (
    <Card className='p-6'>
      <div className='space-y-8'>
        <div>
          <Text size='5' weight='bold'>
            Maintenance Dashboard
          </Text>
          <br />
          <Text color='gray'>Monitor and maintain your application's health and user feedback.</Text>
        </div>

        <div className='space-y-6'>
          <Text size='4' weight='bold'>
            Performance Metrics
          </Text>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Text as='label' size='2' weight='bold'>
                  Metric Name
                </Text>
                <TextField.Root>
                  <TextField.Input
                    placeholder='Enter metric name...'
                    value={currentMetric.name || ''}
                    onChange={(e) => setCurrentMetric((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </TextField.Root>
              </div>

              <div className='space-y-2'>
                <Text as='label' size='2' weight='bold'>
                  Metric Type
                </Text>
                <Select.Root value={currentMetric.type} onValueChange={(type) => setCurrentMetric((prev) => ({ ...prev, type }))}>
                  <Select.Trigger className='w-full' />
                  <Select.Content>
                    {METRIC_TYPES.map((type) => (
                      <Select.Item key={type} value={type}>
                        {type}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </div>
            </div>

            <div className='space-y-2'>
              <Text as='label' size='2' weight='bold'>
                Value
              </Text>
              <TextField.Root>
                <TextField.Input
                  placeholder='Enter metric value...'
                  value={currentMetric.value || ''}
                  onChange={(e) => setCurrentMetric((prev) => ({ ...prev, value: e.target.value }))}
                />
              </TextField.Root>
            </div>

            <Button onClick={handleAddMetric}>Add Metric</Button>
          </div>

          {metrics.length > 0 && (
            <div className='grid grid-cols-2 gap-4'>
              {metrics.map((metric) => (
                <Card key={metric.id} className='p-4'>
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                      <Text weight='bold'>{metric.name}</Text>
                      <Text size='1' color={metric.status === 'healthy' ? 'green' : metric.status === 'warning' ? 'yellow' : 'red'}>
                        {metric.status}
                      </Text>
                    </div>
                    <Text color='gray'>{metric.type}</Text>
                    <Text>{metric.value}</Text>
                    <Text size='1' color='gray'>
                      Last updated: {new Date(metric.lastUpdated).toLocaleString()}
                    </Text>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className='space-y-6'>
          <Text size='4' weight='bold'>
            User Feedback
          </Text>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Text as='label' size='2' weight='bold'>
                Feedback Type
              </Text>
              <Select.Root value={currentFeedback.type} onValueChange={(type) => setCurrentFeedback((prev) => ({ ...prev, type }))}>
                <Select.Trigger className='w-full' />
                <Select.Content>
                  {FEEDBACK_TYPES.map((type) => (
                    <Select.Item key={type} value={type}>
                      {type}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>

            <div className='space-y-2'>
              <Text as='label' size='2' weight='bold'>
                Content
              </Text>
              <TextArea
                placeholder='Enter feedback content...'
                value={currentFeedback.content || ''}
                onChange={(e) => setCurrentFeedback((prev) => ({ ...prev, content: e.target.value }))}
              />
            </div>

            <Button onClick={handleAddFeedback}>Add Feedback</Button>
          </div>

          {completion && (
            <div className='space-y-2'>
              <Text weight='bold'>AI Analysis</Text>
              <Card className='p-4 bg-muted'>
                <MarkdownContent content={completion} />
              </Card>
            </div>
          )}

          {feedback.length > 0 && (
            <div className='space-y-4'>
              {feedback.map((item) => (
                <Card key={item.id} className='p-4'>
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                      <Text weight='bold'>{item.type}</Text>
                      <div className='space-x-2'>
                        <Button
                          size='1'
                          variant={item.status === 'new' ? 'solid' : 'outline'}
                          onClick={() => handleUpdateFeedbackStatus(item.id, 'new')}>
                          New
                        </Button>
                        <Button
                          size='1'
                          variant={item.status === 'in-progress' ? 'solid' : 'outline'}
                          onClick={() => handleUpdateFeedbackStatus(item.id, 'in-progress')}>
                          In Progress
                        </Button>
                        <Button
                          size='1'
                          variant={item.status === 'resolved' ? 'solid' : 'outline'}
                          onClick={() => handleUpdateFeedbackStatus(item.id, 'resolved')}>
                          Resolved
                        </Button>
                      </div>
                    </div>
                    <Text>{item.content}</Text>
                    <Text size='1' color='gray'>
                      Created: {new Date(item.createdAt).toLocaleString()}
                    </Text>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
